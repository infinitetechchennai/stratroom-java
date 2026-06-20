# Stratroom Backend → Project Reactor (Spring WebFlux + R2DBC) Migration Plan

**Goal:** higher throughput / scalability.
**Scope decision:** full conversion of `stratroom-backend` (the single consolidated app).
`stratroom-ui` is **out of scope** — Project Reactor is a Java library; the React frontend is
unaffected and needs no changes. The other Maven modules (`authservice`, `db-service`,
`scorecard-service`, `etl-service`, `userservice`, `licenseservice`, `stratroom-web`) are
**not converted** — their code was already merged into `stratroom-backend`, which has no
Maven dependency on them.

---

## 0. Reality check before you commit (read this first)

You chose reactive for **throughput/scalability**. Be aware that for a JPA/JDBC app the
single biggest win usually comes *before* going reactive:

- **The DB is the bottleneck, not the threads, in most CRUD apps.** Reactive removes the
  "one thread per request" ceiling, but if every request still hits MySQL, you've just
  moved the wait. R2DBC connection pools are still finite.
- **Cheaper levers to benchmark first:** tune the HikariCP pool, add caching (Infinispan is
  already a dependency), use Spring MVC async (`Callable`/`DeferredResult`) or virtual
  threads (**Java 21 — you're already on it**: `spring.threads.virtual.enabled=true`).
  Virtual threads give much of the scalability of reactive with **none** of this rewrite.

**Recommendation:** run a load test (Phase 0) and try virtual threads first. If that doesn't
meet the target, proceed with this plan. The plan below assumes you proceed with full reactive.

---

## 1. Inventory (what we're actually changing)

| Concern | Count | Reactive impact |
|---|---:|---|
| Java files | 1,134 | baseline |
| Controllers (`@RestController/@Controller`) | 155 | return `Mono`/`Flux`; servlet types removed |
| JPA repositories | 140 | → R2DBC `ReactiveCrudRepository` / `DatabaseClient` |
| `@Entity` classes | 153 | → R2DBC `@Table` POJOs (no Hibernate) |
| `@Query` (JPQL/native) | **634** | **JPQL not supported by R2DBC — rewrite as native SQL** |
| Relationship mappings (`@OneToMany`/`@ManyToOne`/…) | **80 files** | **No R2DBC equivalent — manual joins / multiple queries** |
| `HttpServletRequest`/servlet API | 99 files | → `ServerWebExchange` / `ServerRequest` |
| `UserThreadLocal` (ThreadLocal) | **121 files** | **ThreadLocal breaks across schedulers — → Reactor `Context`** |
| `@Transactional` | 26 | → R2DBC `ReactiveTransactionManager` |
| `RestTemplate`/`WebClient` | 91 files | `RestTemplate` → `WebClient` |
| `JdbcTemplate` | 9 | → `DatabaseClient` |

**The three killers:** the 634 JPQL queries, the 80 files of relationship mapping (R2DBC has
no lazy loading / no entity graph), and the 121 ThreadLocal-dependent files. These dominate
the effort, not the controllers.

---

## 2. Target architecture

- **Runtime:** Netty (reactive) instead of Tomcat.
- **Web:** Spring WebFlux, annotated controllers returning `Mono<T>`/`Flux<T>`.
- **Data:** Spring Data R2DBC + `r2dbc-mysql`. Entities become flat `@Table` POJOs; all
  relationships resolved explicitly via repository composition or `DatabaseClient` joins.
- **Security:** reactive Spring Security (`SecurityWebFilterChain`), JWT validated in a
  `WebFilter`, identity propagated via Reactor `Context` (replacing `UserThreadLocal`).
- **Blocking libraries** (POI, iText, JavaMail, AWS SDK v1, LDAP, msal4j, super-csv): kept,
  but every blocking call wrapped in `Mono.fromCallable(...).subscribeOn(Schedulers.boundedElastic())`.

---

## 3. Dependency changes (`stratroom-backend/pom.xml`)

**Remove / replace:**
| Remove | Add |
|---|---|
| `spring-boot-starter-web` | `spring-boot-starter-webflux` |
| `spring-boot-starter-data-jpa` | `spring-boot-starter-data-r2dbc` |
| `spring-boot-starter-jdbc` | (use `DatabaseClient` from r2dbc) |
| `mysql-connector-j` (JDBC) | `io.asyncer:r2dbc-mysql` (reactive driver) — **keep JDBC driver too** if any blocking lib needs DataSource (e.g. Spring Batch/quartz/Liquibase) |
| `springdoc-openapi-starter-webmvc-ui` | `springdoc-openapi-starter-webflux-ui` |
| `spring-boot-starter-security` | same artifact, but config becomes reactive |

**Keep but must offload to schedulers (blocking):** `spring-boot-starter-mail`, `poi`,
`poi-ooxml`, `itextpdf`, `xmlworker`, `aws-java-sdk-s3` (ideally migrate to AWS SDK v2 async),
`spring-ldap-core`, `msal4j`, `super-csv`, `commons-fileupload` (WebFlux handles multipart
differently — `commons-fileupload` is servlet-only and must be **replaced** with WebFlux
`Part`/`FilePart`).

**Note:** `commons-fileupload` and `springdoc-...-webmvc` are hard incompatibilities — they
will not work under WebFlux at all.

---

## 4. Phased execution

### Phase 0 — Baseline & spike (1 week)
- Load-test the current app; record p99 latency, throughput, thread saturation, DB pool waits.
- **Try `spring.threads.virtual.enabled=true` (Java 21) and re-test.** If it meets the goal, stop here.
- Build a throwaway WebFlux+R2DBC spike of **one** read endpoint (`GET /scorecardV2/{pageId}`)
  to prove the r2dbc-mysql driver, connection factory, and JSON shape, and to benchmark
  reactive vs virtual-threads on a real query.

### Phase 1 — Reactive infrastructure scaffolding (1 week)
- Branch off `dev-master`. New pom (Section 3).
- `R2dbcConfig`: `ConnectionFactory`, `R2dbcEntityTemplate`, `ReactiveTransactionManager`,
  connection pool sizing.
- Reactive security skeleton: `SecurityWebFilterChain`, JWT `WebFilter` (port
  `CustomOAuthAuthenticationFilter` / `ResourceServerConfig` to reactive).
- Global reactive exception handler (`@RestControllerAdvice` works in WebFlux).
- App boots on Netty with one health endpoint. **Nothing else compiles yet — expected.**

### Phase 2 — Cross-cutting primitives (1–2 weeks) — *do before bulk data work*
- **`UserThreadLocal` → Reactor `Context`.** Introduce a `SecurityContextHolder`-style helper
  that reads org/user id from the Reactor context. Provide a `Mono<UserInfo> currentUser()`.
  This is invasive (121 files) but must be designed *first* so the service rewrites use it.
- Multipart/file upload helper (WebFlux `FilePart`) to replace `commons-fileupload`.
- `WebClient` bean to replace `RestTemplate` (91 files touch HTTP).

### Phase 3 — Data layer (the bulk: 6–10 weeks)
Migrate **vertical slice by slice** (scorecard, org, kpi, meeting, etl, …), not all at once.
For each slice:
1. Convert `@Entity` → R2DBC `@Table` POJO (drop `@OneToMany`/`@ManyToOne`; keep FK columns
   as plain fields).
2. Convert repository → `ReactiveCrudRepository<T, ID>`.
3. **Rewrite each `@Query`:** JPQL → **native SQL** (R2DBC only speaks native SQL). 634 of these.
   Derived query methods (`findByX`) mostly carry over.
4. Replace relationship traversal (lazy `getKpiList()` etc.) with explicit repository calls
   composed via `flatMap`/`zip`, or a `DatabaseClient` join that maps rows manually (the
   `ScorecardCalculationService` already does this style with `JdbcTemplate` — port those 9
   to `DatabaseClient` first as the template).
5. Blob columns (`kpi_value`, `score_card_val`, …): read as `byte[]`; keep the existing
   Java-deserialization in app code (it's CPU-bound, fine on the event loop or boundedElastic).

### Phase 4 — Service layer (4–6 weeks, overlaps Phase 3)
- Every service method returns `Mono`/`Flux`; compose instead of imperative loops.
- `@Transactional` → reactive transactions via `TransactionalOperator` or reactive `@Transactional`.
- **Wrap every blocking library call** (POI, iText, JavaMail, S3 v1, LDAP, msal4j, CSV) in
  `Mono.fromCallable(...).subscribeOn(Schedulers.boundedElastic())`. Audit each — a single
  hidden blocking call on the event loop kills throughput (add BlockHound in tests to catch these).

### Phase 5 — Web layer (2–3 weeks)
- 155 controllers: return types → `Mono`/`Flux`; `HttpServletRequest`→`ServerWebExchange`;
  `@RequestParam`/`@PathVariable` unchanged; file upload → `@RequestPart FilePart`.
- Swagger → springdoc webflux.

### Phase 6 — Testing & perf validation (2–3 weeks)
- Replace MockMvc with `WebTestClient`; unit-test reactive flows with `StepVerifier`.
- **BlockHound** in the test profile to fail the build on blocking calls on event-loop threads.
- Re-run the Phase 0 load test; compare against baseline and the virtual-threads number.

### Phase 7 — Cutover (1 week)
- Staging soak, connection-pool tuning, rollback plan (keep the MVC build deployable until signed off).

---

## 5. Codebase-specific risk register

1. **JPQL volume (634):** highest-risk, error-prone manual translation; subtle semantic diffs
   (joins, `IN` subqueries like `findByScorecardId`). Needs query-by-query test coverage.
2. **Lost lazy loading (80 files):** any code relying on Hibernate traversing relationships
   will N+1 or break; each must be re-expressed as explicit reactive composition.
3. **`UserThreadLocal` (121 files):** the classic reactive trap — values silently become null
   across thread hops. Must be Context-based and threaded through *every* call.
4. **Hidden blocking calls:** JavaMail, POI, iText, AWS v1, LDAP, msal4j are all blocking;
   missing even one on the event loop tanks throughput. BlockHound is mandatory.
5. **`commons-fileupload` + `springdoc-webmvc`:** servlet-only — hard breaks, must be replaced.
6. **No Hibernate dirty-checking / cascade / 2nd-level cache:** all save logic becomes explicit.
7. **Infinispan:** has reactive APIs but the embedded config may need rework.

---

## 6. Effort estimate

Roughly **5–8 months for one experienced developer**, or ~**3–4 months for a small team**,
dominated by Phase 3 (data) and Phase 4 (services). This is a rewrite of the persistence and
web tiers, not a dependency swap.

---

## 7. Recommended first concrete step

Do **Phase 0** before committing to the full plan: load-test current state, flip
`spring.threads.virtual.enabled=true`, re-test. If virtual threads hit your throughput target,
you avoid this entire migration. If not, start the reactive work with the **scorecardV2 read
slice** (it already uses `JdbcTemplate`, so it's the easiest, lowest-risk first conversion and
a good template for the rest).
