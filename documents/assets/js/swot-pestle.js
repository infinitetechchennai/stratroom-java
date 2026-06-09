// ═══════════════════════════════════════════════
//  SINGLE SOURCE OF TRUTH — all factors live here
// ═══════════════════════════════════════════════
const SWOT_CATS = ['SW', 'WW', 'OW', 'TW']
const PESTLE_CATS = ['P', 'E', 'S', 'T', 'En', 'L']
const CAT_COLOR = { SW: '#22c55e', WW: '#ef4444', OW: '#3b82f6', TW: '#f59e0b', P: '#1d4ed8', E: '#047857', S: '#7c3aed', T: '#d97706', En: '#0f766e', L: '#be123c' }
const CAT_LABEL = { SW: 'Strength', WW: 'Weakness', OW: 'Opportunity', TW: 'Threat', P: 'Political', E: 'Economic', S: 'Social', T: 'Technology', En: 'Environmental', L: 'Legal' }

let factors = [
  // ── STRENGTHS (6 items) ──
  { id: 1, cat: 'SW', title: 'Strong brand equity and market recognition', desc: 'Consistently ranked top-3 in independent brand surveys; NPS of 68 across key segments. Brand trust reduces customer acquisition cost by ~20%.', dept: 'Marketing', bizImpact: 'Revenue retention', impact: 5, like: 4, status: 'green', date: '2025-06-30' },
  { id: 2, cat: 'SW', title: 'Diversified revenue mix across multiple segments', desc: 'No single segment exceeds 32% of total revenue. Diversification buffers against sectoral downturns and smooths earnings volatility.', dept: 'Finance', bizImpact: 'Revenue stability', impact: 4, like: 5, status: 'green', date: '2025-09-30' },
  { id: 3, cat: 'SW', title: 'Experienced leadership with long average tenure', desc: 'Average executive tenure of 14 years drives strategic continuity and institutional knowledge. Board diversity score above industry median.', dept: 'HR', bizImpact: 'Execution quality', impact: 3, like: 4, status: 'green', date: '2025-12-31' },
  { id: 4, cat: 'SW', title: 'Proprietary data assets and analytics capability', desc: '8 years of customer behavioural data processed through in-house analytics platform; competitors lack comparable first-party dataset depth.', dept: 'Technology', bizImpact: 'Competitive differentiation', impact: 4, like: 4, status: 'green', date: '2025-07-31' },
  { id: 5, cat: 'SW', title: 'Scalable operating model with proven unit economics', desc: 'Gross margin stable at 62–65% across growth cycles; operating leverage confirmed through three expansion phases.', dept: 'Finance', bizImpact: 'Profitability', impact: 4, like: 5, status: 'green', date: '2025-09-30' },
  { id: 6, cat: 'SW', title: 'Strategic partnerships with tier-1 suppliers', desc: 'Long-term preferred-supplier agreements with 4 of the top 6 global vendors; pricing advantage of 8–12% vs spot market.', dept: 'Operations', bizImpact: 'Cost advantage', impact: 3, like: 5, status: 'green', date: '2025-12-31' },

  // ── WEAKNESSES (6 items) ──
  { id: 7, cat: 'WW', title: 'Legacy IT infrastructure limiting agility', desc: 'Core ERP on-premise since 2011; estimated $18M replacement cost. Estimated 30% slower release cycles vs cloud-native competitors.', dept: 'Technology', bizImpact: 'Operational efficiency', impact: 5, like: 5, status: 'red', date: '2025-03-31' },
  { id: 8, cat: 'WW', title: 'High employee attrition in digital/tech roles', desc: 'Annual turnover at 26% vs 17% industry average. Cost-to-replace per head estimated at $95K; pipeline quality declining in specialist roles.', dept: 'HR', bizImpact: 'Talent retention', impact: 4, like: 4, status: 'amber', date: '2025-04-30' },
  { id: 9, cat: 'WW', title: 'Limited geographic diversification — home-market concentration', desc: '78% of revenue derived from a single country. Macro shocks in home market flow through to the P&L without natural hedge.', dept: 'Strategy', bizImpact: 'Revenue resilience', impact: 4, like: 3, status: 'amber', date: '2025-06-30' },
  { id: 10, cat: 'WW', title: 'Underdeveloped digital customer experience', desc: 'NPS on digital channels is 34 vs 68 in-person. App store rating 3.1/5; competitor average is 4.4. Churn risk elevated for digital-first segments.', dept: 'Marketing', bizImpact: 'Customer retention', impact: 3, like: 5, status: 'amber', date: '2025-05-31' },
  { id: 11, cat: 'WW', title: 'Supply chain single-source dependencies', desc: '3 critical components sourced from a single supplier each. Any disruption triggers 4–6 week fulfillment delays with no validated alternative.', dept: 'Operations', bizImpact: 'Service continuity', impact: 5, like: 3, status: 'amber', date: '2025-06-30' },
  { id: 12, cat: 'WW', title: 'Thin R&D investment relative to sector peers', desc: 'R&D at 2.1% of revenue vs sector median of 5.8%. Product pipeline depth is 40% below top-quartile peers; innovation gap widening.', dept: 'Strategy', bizImpact: 'Product competitiveness', impact: 4, like: 4, status: 'red', date: '2025-04-30' },

  // ── OPPORTUNITIES (6 items) ──
  { id: 13, cat: 'OW', title: 'Government infrastructure contracts pipeline', desc: '$2.4B addressable tender pipeline identified for next 24 months. Pre-qualification completed for 6 of 9 shortlisted bids.', dept: 'Strategy', bizImpact: 'Revenue growth', impact: 5, like: 4, status: 'green', date: '2025-06-30' },
  { id: 14, cat: 'OW', title: 'AI/ML automation to reduce operational costs', desc: 'Pilot in 2 business units confirms 22% unit cost reduction achievable. Full rollout projected at $4.2M capex with 18-month payback.', dept: 'Technology', bizImpact: 'Cost reduction', impact: 4, like: 3, status: 'amber', date: '2025-07-31' },
  { id: 15, cat: 'OW', title: 'Emerging market expansion into Southeast Asia', desc: 'Market sizing study complete; total addressable market of $680M. Entry cost estimated at $9M over 18 months; comparable peers achieved payback in 3 years.', dept: 'Strategy', bizImpact: 'Revenue growth', impact: 4, like: 3, status: 'amber', date: '2025-12-31' },
  { id: 16, cat: 'OW', title: 'Platform monetisation through data licensing', desc: 'Anonymised dataset with 12M records has commercial value to 3 confirmed category buyers. Conservatively priced at $3–6M annual recurring revenue.', dept: 'Finance', bizImpact: 'New revenue stream', impact: 3, like: 4, status: 'green', date: '2025-09-30' },
  { id: 17, cat: 'OW', title: 'M&A to acquire technology capability gap', desc: '5 acquisition targets identified in the $15–40M range that would close the R&D deficit. Dry powder on balance sheet sufficient for 2 bolt-on deals.', dept: 'Strategy', bizImpact: 'Capability expansion', impact: 4, like: 3, status: 'amber', date: '2025-12-31' },
  { id: 18, cat: 'OW', title: 'Sustainability premium — ESG-aligned product tier', desc: 'Consumer research shows 38% willingness-to-pay premium for certified sustainable products. No current competitor has achieved category certification.', dept: 'Marketing', bizImpact: 'Margin expansion', impact: 3, like: 4, status: 'green', date: '2025-10-31' },

  // ── THREATS (6 items) ──
  { id: 19, cat: 'TW', title: 'Low-cost new entrant capturing market share', desc: 'Launched 18 months ago with 28% lower pricing. Has taken 4.2% share in core category; trajectory suggests 9% by end of year at current pace.', dept: 'Strategy', bizImpact: 'Revenue at risk', impact: 5, like: 4, status: 'red', date: '2025-03-31' },
  { id: 20, cat: 'TW', title: 'Data privacy regulation — stricter enforcement', desc: 'Phase 2 enforcement of data localisation laws commences Q3 2025. Non-compliance fine cap is 4% of global turnover; remediation cost estimated $3.2M.', dept: 'Compliance', bizImpact: 'Compliance cost', impact: 4, like: 5, status: 'red', date: '2025-05-31' },
  { id: 21, cat: 'TW', title: 'Talent war intensifying for specialist skills', desc: 'Competing offers averaging 25–35% above current pay bands in AI, data, and engineering roles. Time-to-hire for senior positions extended from 6 to 14 weeks.', dept: 'HR', bizImpact: 'Talent cost and quality', impact: 4, like: 4, status: 'amber', date: '2025-04-30' },
  { id: 22, cat: 'TW', title: 'Supply chain disruption — geopolitical volatility', desc: 'Shipping lane disruptions and export controls have increased lead times by 40% and input costs by 18% over 12 months. No short-term structural resolution forecast.', dept: 'Operations', bizImpact: 'Cost and delivery risk', impact: 4, like: 4, status: 'amber', date: '2025-06-30' },
  { id: 23, cat: 'TW', title: 'Platform disintermediation by digital aggregators', desc: 'Aggregator platforms now control 31% of category discovery. If market share reaches 45%, direct customer relationships and margin are structurally threatened.', dept: 'Marketing', bizImpact: 'Margin compression', impact: 3, like: 4, status: 'amber', date: '2025-09-30' },
  { id: 24, cat: 'TW', title: 'Cyber threat landscape — ransomware escalation', desc: 'Sector-wide ransomware incidents up 64% YoY. A successful attack on core systems estimated at $7–22M total cost (remediation + downtime + reputation).', dept: 'Technology', bizImpact: 'Business continuity', impact: 5, like: 3, status: 'amber', date: '2025-06-30' },

  // ── POLITICAL (5 items) ──
  { id: 25, cat: 'P', title: 'Government procurement localisation mandates', desc: 'New policies require 30% local content across public-sector contracts. Creates preference window for established domestic players.', dept: 'Strategy', bizImpact: 'Contract win rate', impact: 4, like: 5, status: 'green', date: '2025-06-30' },
  { id: 26, cat: 'P', title: 'Trade tariff escalation on imported components', desc: 'Proposed tariff increases of 15–25% on key input categories under review by trade authority. Effective Q1 2026 if ratified.', dept: 'Operations', bizImpact: 'Input cost inflation', impact: 4, like: 4, status: 'amber', date: '2025-09-30' },
  { id: 27, cat: 'P', title: 'Political instability in key export markets', desc: 'Two tier-2 export markets face governance uncertainty heading into election cycles. Historical precedent shows 20–30% revenue volatility in such periods.', dept: 'Strategy', bizImpact: 'Revenue predictability', impact: 3, like: 3, status: 'amber', date: '2025-12-31' },
  { id: 28, cat: 'P', title: 'Favourable industrial policy and tax incentives', desc: 'Government stimulus package includes investment tax credits of up to 12% for qualifying capex in target sectors. Application window open through Q3.', dept: 'Finance', bizImpact: 'Net capex cost', impact: 3, like: 4, status: 'green', date: '2025-08-31' },
  { id: 29, cat: 'P', title: 'Cross-border digital trade framework ratification', desc: 'Regional digital trade agreement expected mid-2025; will reduce compliance friction and cross-border transaction cost by an estimated 18%.', dept: 'Finance', bizImpact: 'Market access cost', impact: 3, like: 4, status: 'green', date: '2025-09-30' },

  // ── ECONOMIC (5 items) ──
  { id: 30, cat: 'E', title: 'Elevated interest rates compressing capital budgets', desc: 'Central bank policy rates held at cycle highs; infrastructure project NPVs reduced 12–15%. Customer capex decisions are being deferred 6–12 months.', dept: 'Finance', bizImpact: 'Pipeline conversion rate', impact: 4, like: 4, status: 'red', date: '2025-06-30' },
  { id: 31, cat: 'E', title: 'Resilient consumer demand despite inflationary pressure', desc: 'Real consumer spending growth of 2.8% maintained despite CPI above 5%. Premium tier holding share; value-seeking shift concentrated in mid-market.', dept: 'Marketing', bizImpact: 'Volume and mix', impact: 4, like: 3, status: 'green', date: '2025-09-30' },
  { id: 32, cat: 'E', title: 'Currency volatility compressing export margins', desc: 'Home currency appreciation of 8% YTD against key trading currencies. Every 5% move reduces export revenue contribution by approximately $1.1M.', dept: 'Finance', bizImpact: 'Export margin', impact: 3, like: 4, status: 'amber', date: '2025-06-30' },
  { id: 33, cat: 'E', title: 'Commodity price volatility — energy and raw materials', desc: 'Energy input costs up 22% and key raw material up 17% year-on-year. Hedging programme covers only 40% of exposure through Q4.', dept: 'Operations', bizImpact: 'Cost of goods sold', impact: 4, like: 4, status: 'amber', date: '2025-06-30' },
  { id: 34, cat: 'E', title: 'Increasing government-led infrastructure spend', desc: 'Public-sector infrastructure spend up 18% year-on-year across target verticals. Creates a multi-year revenue tailwind for project-linked offerings.', dept: 'Strategy', bizImpact: 'Revenue pipeline', impact: 5, like: 3, status: 'green', date: '2025-12-31' },

  // ── SOCIAL (5 items) ──
  { id: 35, cat: 'S', title: 'Digital-native workforce demanding modern tooling', desc: 'Candidates and employees expect AI-augmented workflows, flexible hours, and collaboration platforms. Organisations without these see 2× attrition risk.', dept: 'HR', bizImpact: 'Talent retention', impact: 4, like: 5, status: 'amber', date: '2025-04-30' },
  { id: 36, cat: 'S', title: 'Sustainability and ESG expectations from customers', desc: '68% of B2B buyers now include ESG criteria in vendor evaluation; figure rising 8 percentage points annually. Non-qualifying vendors face deselection risk.', dept: 'Strategy', bizImpact: 'Procurement win rate', impact: 4, like: 4, status: 'amber', date: '2025-09-30' },
  { id: 37, cat: 'S', title: 'Demographic shift — ageing customer base in core segment', desc: 'Primary customer cohort median age rising 2 years every 3 years. Spending patterns, channel preferences, and product needs shifting accordingly.', dept: 'Marketing', bizImpact: 'Product-market fit', impact: 3, like: 5, status: 'amber', date: '2025-12-31' },
  { id: 38, cat: 'S', title: 'Rising consumer trust in peer-review and social proof', desc: '87% of B2C purchase decisions influenced by online reviews. Reputation management and UGC programmes are now table-stakes for conversion rate.', dept: 'Marketing', bizImpact: 'Conversion rate', impact: 3, like: 5, status: 'green', date: '2025-06-30' },
  { id: 39, cat: 'S', title: 'Mental health and wellbeing as employer brand driver', desc: 'Organisations with accredited wellbeing programmes report 19% lower sick leave and 23% stronger employer brand scores in graduate surveys.', dept: 'HR', bizImpact: 'Employer brand / attrition', impact: 2, like: 4, status: 'green', date: '2025-12-31' },

  // ── TECHNOLOGY (5 items) ──
  { id: 40, cat: 'T', title: 'Generative AI disrupting knowledge-work economics', desc: '40–60% unit cost reduction demonstrated in professional services workflows. Organisations not integrating AI face structural cost disadvantage within 24 months.', dept: 'Technology', bizImpact: 'Operating cost structure', impact: 5, like: 5, status: 'red', date: '2025-06-30' },
  { id: 41, cat: 'T', title: 'Cloud-native competitors with faster release velocity', desc: 'Cloud-native peers deploy 10–20× faster than on-premise counterparts. Feature parity gap growing; customer satisfaction scores diverging.', dept: 'Technology', bizImpact: 'Product competitiveness', impact: 4, like: 4, status: 'red', date: '2025-06-30' },
  { id: 42, cat: 'T', title: 'IoT and real-time data enabling predictive services', desc: 'Sensor and device data enabling predictive maintenance, personalisation, and dynamic pricing. First-movers achieving 15–25% service margin uplift.', dept: 'Technology', bizImpact: 'Service revenue', impact: 4, like: 3, status: 'amber', date: '2025-09-30' },
  { id: 43, cat: 'T', title: 'Cybersecurity risk from expanding digital attack surface', desc: 'Each new digital integration point increases attack surface. Sector cyber-insurance premiums up 48% YoY; coverage conditions tightening.', dept: 'Technology', bizImpact: 'Risk exposure / cost', impact: 5, like: 4, status: 'red', date: '2025-03-31' },
  { id: 44, cat: 'T', title: 'Automation reducing manual processing costs', desc: 'Robotic process automation applicable to 35–40% of current back-office FTEs. Full deployment estimated at $2.1M with 14-month payback.', dept: 'Operations', bizImpact: 'Headcount cost', impact: 3, like: 4, status: 'green', date: '2025-10-31' },

  // ── ENVIRONMENTAL (5 items) ──
  { id: 45, cat: 'En', title: 'Mandatory carbon disclosure and net-zero targets', desc: 'Regulators requiring Scope 1/2/3 reporting from FY2026. Failure to comply excludes from public procurement. Measurement programme setup cost ~$650K.', dept: 'Compliance', bizImpact: 'Compliance / procurement', impact: 4, like: 5, status: 'amber', date: '2025-09-30' },
  { id: 46, cat: 'En', title: 'Physical climate risk to supply chain infrastructure', desc: 'Flood and heat-stress risk assessments show 3 key logistics nodes in high-exposure zones by 2035. Relocation or resilience investment needed.', dept: 'Operations', bizImpact: 'Supply chain continuity', impact: 4, like: 3, status: 'amber', date: '2025-12-31' },
  { id: 47, cat: 'En', title: 'Green premium opportunity in product portfolio', desc: 'Certified low-carbon product variants command 12–18% price premium in tested markets. Certification pathway 9–12 months; competitors 18+ months behind.', dept: 'Marketing', bizImpact: 'Margin expansion', impact: 3, like: 4, status: 'green', date: '2025-10-31' },
  { id: 48, cat: 'En', title: 'Energy cost pressure driving efficiency imperative', desc: 'Energy costs represent 11% of COGS; grid price increases of 20%+ forecast over 3 years. On-site renewable investment would deliver 7-year payback.', dept: 'Operations', bizImpact: 'Input cost management', impact: 3, like: 5, status: 'amber', date: '2025-06-30' },
  { id: 49, cat: 'En', title: 'Water and resource scarcity in manufacturing regions', desc: 'Operational sites in water-stressed basins per WRI Aqueduct mapping. Regulatory water restrictions could curtail production by up to 15% in dry seasons.', dept: 'Operations', bizImpact: 'Production capacity', impact: 3, like: 3, status: 'amber', date: '2025-12-31' },

  // ── LEGAL (5 items) ──
  { id: 50, cat: 'L', title: 'Data privacy law enforcement — localisation mandate', desc: 'Phase 2 enforcement active Q3 2025. All personal data must reside in-country. Remediation requires cloud architecture redesign; estimated $2.8M project.', dept: 'Technology', bizImpact: 'Architecture / compliance', impact: 5, like: 5, status: 'red', date: '2025-03-31' },
  { id: 51, cat: 'L', title: 'Evolving employment law — contract worker reclassification', desc: 'Judicial and legislative trend toward reclassifying gig/contractor workers as employees. Exposure estimate: $4–9M in back-payments and benefits.', dept: 'HR', bizImpact: 'Labour cost liability', impact: 4, like: 4, status: 'amber', date: '2025-06-30' },
  { id: 52, cat: 'L', title: 'Intellectual property — third-party patent exposure', desc: 'Freedom-to-operate analysis identified 3 active patents that could be asserted against core product features. Legal opinion recommends licensing negotiation.', dept: 'Strategy', bizImpact: 'Product continuity / cost', impact: 4, like: 3, status: 'amber', date: '2025-08-31' },
  { id: 53, cat: 'L', title: 'Anti-competition scrutiny of market-leading position', desc: 'Regulator has opened preliminary inquiry into market concentration. Historical cases suggest 12–18 month review; potential remedy could include divestiture.', dept: 'Compliance', bizImpact: 'Business model risk', impact: 5, like: 2, status: 'amber', date: '2025-12-31' },
  { id: 54, cat: 'L', title: 'Product liability standard tightening in EU markets', desc: 'Revised EU Product Liability Directive in force 2026 extends claims window and shifts burden of proof. Legal review of product documentation underway.', dept: 'Compliance', bizImpact: 'Liability exposure', impact: 3, like: 4, status: 'amber', date: '2025-09-30' },
]
let editingId = null
let activeFilters = { statuses: ['green', 'amber', 'red'], minImpact: 1 }
let currentImpact = null, currentLike = null, currentCat = null

// ── Utilities ──
function openModal(id) { document.getElementById(id).classList.add('open') }
function closeModal(id) { document.getElementById(id).classList.remove('open') }
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open') })
})
function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2500) }
function riskZone(s) { return s >= 20 ? { label: 'Critical', cls: 'badge-red' } : s >= 12 ? { label: 'High', cls: 'badge-amber' } : s >= 6 ? { label: 'Moderate', cls: 'badge-teal' } : { label: 'Low', cls: 'badge-green' } }
function riskColor(s) { return s >= 20 ? '#dc2626' : s >= 12 ? '#f87171' : s >= 6 ? '#fbbf24' : '#86efac' }
function nextId() { return factors.length ? Math.max(...factors.map(f => f.id)) + 1 : 1 }
function visibleFactors() { return factors.filter(f => activeFilters.statuses.includes(f.status) && f.impact >= activeFilters.minImpact) }

// ── Stats row (called from buildDashboard) ──
function buildStats() {
  const f = visibleFactors()
  const counts = { SW: 0, WW: 0, OW: 0, TW: 0, PESTLE: 0, crit: 0 }
  f.forEach(x => { if (SWOT_CATS.includes(x.cat)) counts[x.cat]++; if (PESTLE_CATS.includes(x.cat)) counts.PESTLE++; if (x.impact * x.like >= 20) counts.crit++ })
  const avgScore = f.length ? (f.reduce((a, x) => a + x.impact * x.like, 0) / f.length).toFixed(1) : '—'
  document.getElementById('statsRow').innerHTML = `
<div class="stat-card c-teal" onclick="switchTabById('swot')"><div class="lbl">Strengths</div><div class="val">${counts.SW}</div><div class="sub">SWOT internal +</div></div>
<div class="stat-card c-red" onclick="switchTabById('swot')"><div class="lbl">Weaknesses</div><div class="val">${counts.WW}</div><div class="sub">SWOT internal −</div></div>
<div class="stat-card c-green" onclick="switchTabById('swot')"><div class="lbl">Opportunities</div><div class="val">${counts.OW}</div><div class="sub">SWOT external +</div></div>
<div class="stat-card c-amber" onclick="switchTabById('swot')"><div class="lbl">Threats</div><div class="val">${counts.TW}</div><div class="sub">SWOT external −</div></div>
<div class="stat-card c-blue" onclick="switchTabById('pestle')"><div class="lbl">PESTLE factors</div><div class="val">${counts.PESTLE}</div><div class="sub">6 categories</div></div>
<div class="stat-card c-purple" onclick="switchTabById('heatmap')"><div class="lbl">Avg risk score</div><div class="val">${avgScore}</div><div class="sub">${counts.crit} critical (≥20)</div></div>`
}

// ── Dashboard ──
function buildDashboard() {
  buildStats()
  const f = visibleFactors()

  // Donut: risk zones
  const zones = [{ label: 'Critical', min: 20, color: '#dc2626' }, { label: 'High', min: 12, color: '#f87171' }, { label: 'Moderate', min: 6, color: '#fbbf24' }, { label: 'Low', min: 0, color: '#86efac' }]
  const zoneCounts = zones.map(z => ({ ...z, count: f.filter(x => { const s = x.impact * x.like; return s >= z.min && (z.min === 20 || s < zones[zones.indexOf(z) - 1]?.min || z.min === 0) }).length }))
  // recalc properly
  zoneCounts[0].count = f.filter(x => x.impact * x.like >= 20).length
  zoneCounts[1].count = f.filter(x => { const s = x.impact * x.like; return s >= 12 && s < 20 }).length
  zoneCounts[2].count = f.filter(x => { const s = x.impact * x.like; return s >= 6 && s < 12 }).length
  zoneCounts[3].count = f.filter(x => x.impact * x.like < 6).length
  const total = f.length || 1
  let offset = 0; const r = 38; const circ = 2 * Math.PI * r
  let paths = ''
  zoneCounts.forEach(z => {
    if (!z.count) return
    const dash = (z.count / total) * circ
    paths += \`<circle cx="55" cy="55" r="\${r}" fill="none" stroke="\${z.color}" stroke-width="14" stroke-dasharray="\${dash} \${circ}" stroke-dashoffset="-\${offset}" stroke-linecap="butt"/>\`
    offset += dash
  })
  document.getElementById('donutSvg').innerHTML = paths || \`<circle cx="55" cy="55" r="\${r}" fill="none" stroke="var(--border)" stroke-width="14"/>\`
  document.getElementById('donutTotal').textContent = f.length
  document.getElementById('donutLegend').innerHTML = zoneCounts.map(z => \`
<div style="display:flex;align-items:center;justify-content:space-between;font-size:12px">
  <div style="display:flex;align-items:center;gap:6px"><span style="width:10px;height:10px;border-radius:2px;background:\${z.color};display:inline-block"></span><span style="color:var(--text2)">\${z.label}</span></div>
  <span style="font-weight:600;color:var(--text)">\${z.count}</span>
</div>\`).join('')

  // SWOT bars
  const swotDef = [{ cat: 'SW', label: 'Strengths', color: '#22c55e' }, { cat: 'WW', label: 'Weaknesses', color: '#ef4444' }, { cat: 'OW', label: 'Opportunities', color: '#3b82f6' }, { cat: 'TW', label: 'Threats', color: '#f59e0b' }]
  const maxS = Math.max(...swotDef.map(d => f.filter(x => x.cat === d.cat).length), 1)
  document.getElementById('swotBars').innerHTML = swotDef.map(d => {
    const cnt = f.filter(x => x.cat === d.cat).length
    const pct = Math.round(cnt / maxS * 100)
    return \`<div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
    <span style="font-size:12px;color:var(--text2)">\${d.label}</span>
    <span style="font-size:12px;font-weight:600;color:var(--text)">\${cnt}</span>
  </div>
  <div style="height:8px;background:var(--bg);border-radius:4px;border:1px solid var(--border)">
    <div style="height:100%;width:\${pct}%;background:\${d.color};border-radius:4px;transition:width .4s"></div>
  </div>
</div>\`}).join('')

  // Status bars
  const statDef = [{ key: 'red', label: 'Critical', color: '#ef4444' }, { key: 'amber', label: 'Watch', color: '#f59e0b' }, { key: 'green', label: 'Active', color: '#22c55e' }]
  const maxSt = Math.max(...statDef.map(d => f.filter(x => x.status === d.key).length), 1)
  document.getElementById('statusBars').innerHTML = statDef.map(d => {
    const cnt = f.filter(x => x.status === d.key).length
    const pct = Math.round(cnt / maxSt * 100)
    return \`<div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
    <span style="font-size:12px;color:var(--text2)">\${d.label}</span>
    <span style="font-size:12px;font-weight:600;color:var(--text)">\${cnt}</span>
  </div>
  <div style="height:8px;background:var(--bg);border-radius:4px;border:1px solid var(--border)">
    <div style="height:100%;width:\${pct}%;background:\${d.color};border-radius:4px;transition:width .4s"></div>
  </div>
</div>\`}).join('')

  // Top critical
  const crit = f.filter(x => x.impact * x.like >= 12).sort((a, b) => b.impact * b.like - a.impact * a.like)
  document.getElementById('critBadge').textContent = crit.length
  document.getElementById('dashCritical').innerHTML = !crit.length
    ? '<p style="font-size:13px;color:var(--text3)">No high-priority factors.</p>'
    : crit.slice(0, 6).map(x => {
      const s = x.impact * x.like; const z = riskZone(s); return \`
  <div style="display:flex;align-items:center;gap:8px;padding:9px;border-radius:8px;background:\${riskColor(s)}12;margin-bottom:6px;cursor:pointer;border:1px solid \${riskColor(s)}25" onclick="openDetail(\${x.id})">
    <span style="width:8px;height:8px;border-radius:50%;background:\${riskColor(s)};flex-shrink:0"></span>
    <span style="font-size:12px;font-weight:500;flex:1;color:var(--text)">\${x.title}</span>
    <span class="badge \${z.cls}">\${s}</span>
  </div>\`}).join('')

  // Dept breakdown
  const deptMap = {}
  f.forEach(x => { const d = x.dept || 'Unassigned'; if (!deptMap[d]) deptMap[d] = { count: 0, totalRisk: 0 }; deptMap[d].count++; deptMap[d].totalRisk += x.impact * x.like })
  const depts = Object.entries(deptMap).sort((a, b) => b[1].totalRisk - a[1].totalRisk)
  const maxR = Math.max(...depts.map(d => d[1].totalRisk), 1)
  document.getElementById('dashDept').innerHTML = depts.slice(0, 7).map(([dept, info]) => \`
<div style="margin-bottom:8px">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
    <span style="font-size:12px;color:var(--text2)">\${dept}</span>
    <div style="display:flex;align-items:center;gap:6px">
      <span style="font-size:11px;color:var(--text3)">\${info.count} factors</span>
      <span style="font-size:12px;font-weight:600;color:var(--text)">Σ\${info.totalRisk}</span>
    </div>
  </div>
  <div style="height:7px;background:var(--bg);border-radius:4px;border:1px solid var(--border)">
    <div style="height:100%;width:\${Math.round(info.totalRisk / maxR * 100)}%;background:var(--teal2);border-radius:4px;transition:width .4s"></div>
  </div>
</div>\`).join('')
}

// ── Tab switching ──
function switchTab(name, el) {
  ['dashboard', 'swot', 'pestle', 'heatmap', 'collaborate'].forEach(t => document.getElementById('tab-' + t).style.display = 'none')
  document.getElementById('tab-' + name).style.display = 'block'
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
  el.classList.add('active')
  if (name === 'heatmap') { buildHeatmap(); buildPriority() }
  if (name === 'dashboard') buildDashboard()
}
function switchTabById(name) {
  const tabs = document.querySelectorAll('.tab')
  const names = ['dashboard', 'swot', 'pestle', 'heatmap', 'collaborate']
  const idx = names.indexOf(name)
  if (idx >= 0) switchTab(name, tabs[idx])
}

// ── SWOT ──
const SWOT_DEF = [
  { cat: 'SW', label: 'Strengths', dot: '#22c55e', badge: 'badge-green', addLabel: 'strength' },
  { cat: 'WW', label: 'Weaknesses', dot: '#ef4444', badge: 'badge-red', addLabel: 'weakness' },
  { cat: 'OW', label: 'Opportunities', dot: '#3b82f6', badge: 'badge-blue', addLabel: 'opportunity' },
  { cat: 'TW', label: 'Threats', dot: '#f59e0b', badge: 'badge-amber', addLabel: 'threat' },
]
let swotDeptFilter = ''
function filterSwotDept(v) { swotDeptFilter = v; buildSwot() }

function buildSwot() {
  const f = visibleFactors()
  const g = document.getElementById('swotGrid')
  g.innerHTML = SWOT_DEF.map((def, qi) => {
    const items = f.filter(x => x.cat === def.cat && (!swotDeptFilter || x.dept === swotDeptFilter))
    const cards = items.map(item => {
      const s = item.impact * item.like
      const z = riskZone(s)
      return \`<div class="swot-item" onclick="openDetail(\${item.id})">
    <div class="swot-item-dot" style="background:\${def.dot}"></div>
    <div style="flex:1">
      <div class="swot-item-text">\${item.title}</div>
      <div class="swot-item-meta">
        <span class="swot-score-chip">I:\${item.impact}</span>
        <span class="swot-score-chip">L:\${item.like}</span>
        <span class="swot-score-chip" style="background:\${riskColor(s)};color:\${s >= 6 ? '#fff' : ''}">\${s}</span>
        <span class="badge \${z.cls}" style="font-size:10px">\${z.label}</span>
        \${item.dept ? \`<span style="font-size:10px;color:var(--text3)">\${item.dept}</span>\` : ''}
      </div>
    </div>
  </div>\`
    }).join('')
    const borders = [
      'border-right:1px solid var(--border);border-bottom:1px solid var(--border)',
      'border-bottom:1px solid var(--border)',
      'border-right:1px solid var(--border)',
      ''
    ]
    return \`<div class="swot-quad" style="\${borders[qi]}">
  <div class="swot-quad-header">
    <div class="swot-quad-title"><div class="swot-dot" style="background:\${def.dot}"></div>\${def.label}</div>
    <span class="badge \${def.badge}">\${items.length}</span>
  </div>
  \${cards}
  <button class="add-btn" onclick="openAddModal('\${def.cat}')"><i class="fa-solid fa-plus" style="font-size:10px"></i> Add \${def.addLabel}</button>
</div>\`
  }).join('')
}

// ── PESTLE ──
let pestleFilter = 'ALL'
function filterPestle(cat, el) {
  pestleFilter = cat
  document.querySelectorAll('.pestle-tab').forEach(t => t.classList.remove('active'))
  el.classList.add('active')
  buildPestle()
}
function buildPestle() {
  const f = visibleFactors().filter(x => PESTLE_CATS.includes(x.cat))
  const data = pestleFilter === 'ALL' ? f : f.filter(x => x.cat === pestleFilter)
  const stColor = { green: '#22c55e', amber: '#f59e0b', red: '#ef4444' }
  document.getElementById('pestleList').innerHTML = !data.length
    ? '<p style="font-size:13px;color:var(--text3);padding:12px 0">No factors in this category yet.</p>'
    : data.map(d => {
      const s = d.impact * d.like; const z = riskZone(s)
      return \`<div class="pestle-entry">
    <div class="pestle-avatar" style="background:\${CAT_COLOR[d.cat]}">\${d.cat}</div>
    <div class="pestle-entry-main">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
        <div class="pestle-entry-title">\${d.title}</div>
        <div style="display:flex;gap:5px;align-items:center;flex-shrink:0">
          <span class="badge" style="background:\${CAT_COLOR[d.cat]}18;color:\${CAT_COLOR[d.cat]}">\${CAT_LABEL[d.cat]}</span>
          <span class="badge \${z.cls}">\${z.label} · \${s}</span>
          <div class="status-dot" style="background:\${stColor[d.status]}"></div>
        </div>
      </div>
      \${d.desc ? \`<div class="pestle-entry-desc">\${d.desc}</div>\` : ''}
      <div class="pestle-meta">
        <span class="meta-chip"><i class="fa-solid fa-bolt" style="font-size:9px"></i> Impact \${d.impact}/5</span>
        <span class="meta-chip"><i class="fa-solid fa-percent" style="font-size:9px"></i> Likelihood \${d.like}/5</span>
        \${d.dept ? \`<span class="meta-chip"><i class="fa-solid fa-building" style="font-size:9px"></i> \${d.dept}</span>\` : ''}
        \${d.bizImpact ? \`<span class="meta-chip"><i class="fa-solid fa-arrow-trend-up" style="font-size:9px"></i> \${d.bizImpact}</span>\` : ''}
        <button class="meta-action" style="color:var(--teal2)" onclick="openDetail(\${d.id})"><i class="fa-solid fa-eye" style="font-size:9px"></i> View</button>
        <button class="meta-action" style="color:var(--text2)" onclick="openEditModal(\${d.id})"><i class="fa-solid fa-pen" style="font-size:9px"></i> Edit</button>
        <button class="meta-action" style="color:var(--red)" onclick="deleteFactor(\${d.id})"><i class="fa-solid fa-trash" style="font-size:9px"></i> Delete</button>
      </div>
    </div>
  </div>\`
    }).join('')
}

// ── HEATMAP — driven entirely from factors data ──
function buildHeatmap() {
  const fv = document.getElementById('hmFilter').value
  let data = visibleFactors()
  if (fv === 'SWOT') data = data.filter(x => SWOT_CATS.includes(x.cat))
  else if (fv === 'PESTLE') data = data.filter(x => PESTLE_CATS.includes(x.cat))
  else if (fv === 'W') data = data.filter(x => x.cat === 'WW')
  else if (fv === 'T_swot') data = data.filter(x => x.cat === 'TW')

  // Build cell lookup
  const cells = {}
  data.forEach(f => {
    const key = \`\${f.impact}-\${f.like}\`
    if (!cells[key]) cells[key] = []
    cells[key].push(f)
  })

  const t = document.getElementById('hmTable')
  const impLabels = ['Very high (5)', 'High (4)', 'Medium (3)', 'Low (2)', 'Very low (1)']
  const likeLabels = ['Very low (1)', 'Low (2)', 'Medium (3)', 'High (4)', 'Very high (5)']

  let html = \`<tr><td class="hm-axis-th" style="width:100px;text-align:right;font-weight:600;font-size:11px">Impact ↓ / Like →</td>\`
  likeLabels.forEach(l => { html += \`<td class="hm-axis-th">\${l}</td>\` })
  html += '</tr>'

  for (let row = 0; row < 5; row++) {
    const imp = 5 - row
    html += \`<tr><td class="hm-row-label">\${impLabels[row]}</td>\`
    for (let col = 1; col <= 5; col++) {
      const key = \`\${imp}-\${col}\`
      const items = cells[key] || []
      const s = imp * col
      const bg = riskColor(s)
      html += \`<td class="hm-cell" style="background:\${bg}" onclick="showHmCell(\${imp},\${col},this)">
    <span class="hm-score">\${s}</span>
    <span class="hm-count">\${items.length ? items.length + ' item' + (items.length > 1 ? 's' : '') : ''}</span>
  </td>\`
    }
    html += '</tr>'
  }
  html += \`<tr><td></td>\${[1, 2, 3, 4, 5].map(c => \`<td class="hm-axis-th" style="font-size:10px;color:var(--text3)">Likelihood \${c}</td>\`).join('')}</tr>\`
  t.innerHTML = html
  document.getElementById('hmPanel').innerHTML = '<span style="font-size:12px;color:var(--text3)">Click a cell to see its factors</span>'
}

function showHmCell(imp, like, cellEl) {
  const fv = document.getElementById('hmFilter').value
  let data = visibleFactors()
  if (fv === 'SWOT') data = data.filter(x => SWOT_CATS.includes(x.cat))
  else if (fv === 'PESTLE') data = data.filter(x => PESTLE_CATS.includes(x.cat))
  else if (fv === 'W') data = data.filter(x => x.cat === 'WW')
  else if (fv === 'T_swot') data = data.filter(x => x.cat === 'TW')

  const items = data.filter(f => f.impact === imp && f.like === like)
  const panel = document.getElementById('hmPanel')
  const s = imp * like; const z = riskZone(s)
  document.querySelectorAll('.hm-cell').forEach(c => c.classList.remove('selected'))
  cellEl.classList.add('selected')

  let html = \`<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
<span style="font-size:13px;font-weight:600;color:var(--text)">Impact \${imp} × Likelihood \${like} = <span style="color:\${riskColor(s)}">\${s}</span></span>
<span class="badge \${z.cls}">\${z.label}</span>
</div>\`
  if (!items.length) {
    html += '<span style="font-size:12px;color:var(--text3)">No factors plotted in this cell.</span>'
  } else {
    html += items.map(f => \`<span class="hm-item-chip" style="background:\${CAT_COLOR[f.cat]}18;color:\${CAT_COLOR[f.cat]};border:1px solid \${CAT_COLOR[f.cat]}30" onclick="openDetail(\${f.id})">
  <span style="width:7px;height:7px;border-radius:50%;background:\${CAT_COLOR[f.cat]};display:inline-block"></span>
  \${f.title}
  <span style="opacity:.65;font-size:10px">[\${CAT_LABEL[f.cat]}]</span>
</span>\`).join('')
  }
  panel.innerHTML = html
}

function buildPriority() {
  const high = visibleFactors().filter(f => f.impact * f.like >= 12).sort((a, b) => b.impact * b.like - a.impact * a.like)
  const el = document.getElementById('priorityList')
  if (!high.length) { el.innerHTML = '<p style="font-size:12px;color:var(--text3)">No high-priority factors.</p>'; return }
  el.innerHTML = high.slice(0, 6).map(f => {
    const s = f.impact * f.like; const z = riskZone(s)
    return \`<div style="display:flex;align-items:center;gap:8px;padding:8px;border-radius:7px;background:\${riskColor(s)}18;margin-bottom:6px;cursor:pointer" onclick="openDetail(\${f.id})">
  <span style="width:8px;height:8px;border-radius:50%;background:\${riskColor(s)};flex-shrink:0"></span>
  <span style="font-size:12px;font-weight:500;flex:1;color:var(--text)">\${f.title}</span>
  <span class="badge \${z.cls}">Score \${s}</span>
</div>\`
  }).join('')
}

// ── COLLABORATE: Comments, Actions, Attachments ──
let comments = []
let actions = []
let attachments = []

const USERS = { JD: { name: 'John Doe', color: 'var(--teal2)' }, SA: { name: 'Sarah A.', color: '#8b5cf6' }, MK: { name: 'Mike K.', color: '#f59e0b' }, RB: { name: 'Rachel B.', color: '#ef4444' }, TL: { name: 'Tom L.', color: '#3b82f6' } }
const TAG_META = { question: { icon: '🙋', label: 'Question', cls: 'badge-blue' }, insight: { icon: '💡', label: 'Insight', cls: 'badge-teal' }, concern: { icon: '⚠️', label: 'Concern', cls: 'badge-amber' }, decision: { icon: '✅', label: 'Decision', cls: 'badge-green' } }
const PRIO_META = { high: { icon: '🔴', color: '#ef4444' }, medium: { icon: '🟡', color: '#f59e0b' }, low: { icon: '🟢', color: '#22c55e' } }
const FILE_ICONS = { pdf: 'fa-file-pdf', xlsx: 'fa-file-excel', docx: 'fa-file-word', doc: 'fa-file-word', png: 'fa-file-image', jpg: 'fa-file-image', jpeg: 'fa-file-image', default: 'fa-file' }

function addComment() {
  const text = document.getElementById('commentInput').value.trim()
  if (!text) { toast('Please type a comment first'); return }
  const tag = document.getElementById('commentTag').value
  comments.push({ id: Date.now(), user: 'JD', text, tag, time: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) })
  document.getElementById('commentInput').value = ''
  document.getElementById('commentTag').value = ''
  renderComments()
  toast('Comment posted')
}

function deleteComment(id) {
  comments = comments.filter(c => c.id !== id)
  renderComments()
}

function renderComments() {
  document.getElementById('commentCount').textContent = comments.length
  const el = document.getElementById('commentList')
  if (!comments.length) { el.innerHTML = '<p style="font-size:13px;color:var(--text3);text-align:center;padding:24px 0">No comments yet. Start the conversation!</p>'; return }
  el.innerHTML = [...comments].reverse().map(c => {
    const u = USERS[c.user] || { name: c.user, color: 'var(--teal2)' }
    const initials = c.user
    const tagHtml = c.tag && TAG_META[c.tag] ? \`<span class="badge \${TAG_META[c.tag].cls}" style="font-size:10px;margin-left:4px">\${TAG_META[c.tag].icon} \${TAG_META[c.tag].label}</span>\` : ''
    return \`<div style="display:flex;gap:10px;padding:12px 0;border-bottom:1px solid var(--border)">
  <div style="width:32px;height:32px;border-radius:50%;background:\${u.color};display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:600;flex-shrink:0">\${initials}</div>
  <div style="flex:1">
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;flex-wrap:wrap">
      <span style="font-size:13px;font-weight:600;color:var(--text)">\${u.name}</span>
      \${tagHtml}
      <span style="font-size:11px;color:var(--text3);margin-left:auto">\${c.time}</span>
    </div>
    <div style="font-size:13px;color:var(--text2);line-height:1.5;background:var(--bg);border-radius:8px;padding:10px 12px;border:1px solid var(--border)">\${c.text}</div>
    <button onclick="deleteComment(\${c.id})" style="font-size:11px;color:var(--text3);background:none;border:none;cursor:pointer;margin-top:5px;font-family:inherit;padding:0"><i class="fa-solid fa-trash" style="font-size:9px"></i> Delete</button>
  </div>
</div>\`
  }).join('')
}

function openActionForm() {
  document.getElementById('actionForm').style.display = document.getElementById('actionForm').style.display === 'none' ? 'block' : 'none'
}

function addAction() {
  const title = document.getElementById('actTitle').value.trim()
  if (!title) { toast('Please enter an action description'); return }
  const assignee = document.getElementById('actAssignee').value
  const initials = assignee.split('—')[0].trim()
  actions.push({ id: Date.now(), title, assignee, initials, due: document.getElementById('actDue').value, priority: document.getElementById('actPriority').value, done: false })
  document.getElementById('actTitle').value = ''
  document.getElementById('actDue').value = ''
  document.getElementById('actionForm').style.display = 'none'
  renderActions()
  toast('Action added')
}

function toggleAction(id) {
  const a = actions.find(x => x.id === id)
  if (a) a.done = !a.done
  renderActions()
}

function deleteAction(id) {
  actions = actions.filter(x => x.id !== id)
  renderActions()
}

function renderActions() {
  document.getElementById('actionCount').textContent = actions.filter(x => !x.done).length
  const el = document.getElementById('actionList')
  if (!actions.length) { el.innerHTML = '<p style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">No actions yet.</p>'; return }
  el.innerHTML = actions.map(a => {
    const pm = PRIO_META[a.priority] || PRIO_META.medium
    const u = Object.entries(USERS).find(([k]) => k === a.initials)
    const uColor = u ? u[1].color : 'var(--teal2)'
    const overdue = a.due && !a.done && new Date(a.due) < new Date()
    return \`<div style="display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;background:\${a.done ? 'var(--bg)' : 'var(--white)'};border:1px solid var(--border);margin-bottom:6px;\${a.done ? 'opacity:.6' : ''}">
  <input type="checkbox" \${a.done ? 'checked' : ''} onchange="toggleAction(\${a.id})" style="cursor:pointer;width:16px;height:16px;flex-shrink:0">
  <div style="flex:1;min-width:0">
    <div style="font-size:13px;font-weight:500;color:var(--text);\${a.done ? 'text-decoration:line-through' : ''};margin-bottom:3px">\${a.title}</div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-size:11px;color:var(--text3)">\${pm.icon} \${a.priority}</span>
      \${a.due ? \`<span style="font-size:11px;color:\${overdue ? '#ef4444' : 'var(--text3)'}"><i class="fa-solid fa-calendar-day" style="font-size:9px"></i> \${a.due}\${overdue ? ' · Overdue' : ''}</span>\` : ''}
    </div>
  </div>
  <div style="width:26px;height:26px;border-radius:50%;background:\${uColor};display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;flex-shrink:0;title='\${a.assignee}'">\${a.initials}</div>
  <button onclick="deleteAction(\${a.id})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:12px;padding:0;flex-shrink:0"><i class="fa-solid fa-trash"></i></button>
</div>\`
  }).join('')
}

// Attachments
function handleFileSelect(input) {
  Array.from(input.files).forEach(processFile)
  input.value = ''
}

function handleDrop(e) {
  e.preventDefault()
  document.getElementById('dropZone').style.borderColor = 'var(--border)'
  document.getElementById('dropZone').style.background = ''
  Array.from(e.dataTransfer.files).forEach(processFile)
}

function processFile(file) {
  const ext = file.name.split('.').pop().toLowerCase()
  const sizeKb = (file.size / 1024).toFixed(0)
  const sizeLabel = file.size > 1024 * 1024 ? (file.size / 1024 / 1024).toFixed(1) + ' MB' : sizeKb + ' KB'
  attachments.push({ id: Date.now() + Math.random(), name: file.name, ext, size: sizeLabel, time: new Date().toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) })
  renderAttachments()
  toast(\`Attached: \${file.name}\`)
}

function deleteAttachment(id) {
  attachments = attachments.filter(a => a.id !== id)
  renderAttachments()
}

function renderAttachments() {
  document.getElementById('attachCount').textContent = attachments.length
  const el = document.getElementById('attachList')
  if (!attachments.length) { el.innerHTML = '<p style="font-size:13px;color:var(--text3);text-align:center;padding:16px 0">No attachments yet.</p>'; return }
  const extColor = { pdf: '#ef4444', xlsx: '#22c55e', docx: '#3b82f6', doc: '#3b82f6', png: '#8b5cf6', jpg: '#8b5cf6', jpeg: '#8b5cf6' }
  el.innerHTML = attachments.map(a => {
    const icon = FILE_ICONS[a.ext] || FILE_ICONS.default
    const color = extColor[a.ext] || 'var(--text2)'
    return \`<div style="display:flex;align-items:center;gap:10px;padding:9px;border-radius:8px;border:1px solid var(--border);margin-bottom:6px;background:var(--bg)">
  <div style="width:34px;height:34px;border-radius:8px;background:\${color}15;display:flex;align-items:center;justify-content:center;flex-shrink:0">
    <i class="fa-solid \${icon}" style="font-size:16px;color:\${color}"></i>
  </div>
  <div style="flex:1;min-width:0">
    <div style="font-size:12px;font-weight:500;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">\${a.name}</div>
    <div style="font-size:11px;color:var(--text3)">\${a.size} · \${a.time}</div>
  </div>
  <button onclick="deleteAttachment(\${a.id})" style="background:none;border:none;cursor:pointer;color:var(--text3);font-size:13px;padding:0;flex-shrink:0"><i class="fa-solid fa-trash"></i></button>
</div>\`
  }).join('')
}

// ── DETAIL MODAL ──
function openDetail(id) {
  const f = factors.find(x => x.id === id)
  if (!f) return
  const s = f.impact * f.like; const z = riskZone(s)
  document.getElementById('detailContent').innerHTML = \`
<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:16px;padding-right:30px">
  <div style="width:36px;height:36px;border-radius:9px;background:\${CAT_COLOR[f.cat]}20;display:flex;align-items:center;justify-content:center;flex-shrink:0">
    <span style="font-size:11px;font-weight:700;color:\${CAT_COLOR[f.cat]}">\${f.cat}</span>
  </div>
  <div>
    <div style="font-size:15px;font-weight:600;color:var(--text)">\${f.title}</div>
    <div style="display:flex;gap:6px;margin-top:5px;flex-wrap:wrap">
      <span class="badge" style="background:\${CAT_COLOR[f.cat]}18;color:\${CAT_COLOR[f.cat]}">\${CAT_LABEL[f.cat]}</span>
      <span class="badge \${z.cls}">Risk \${s} — \${z.label}</span>
      \${f.dept ? \`<span class="badge badge-gray">\${f.dept}</span>\` : ''}
    </div>
  </div>
</div>
\${f.desc ? \`<div style="font-size:13px;color:var(--text2);line-height:1.6;margin-bottom:16px;padding:12px;background:var(--bg);border-radius:8px;border-left:3px solid \${CAT_COLOR[f.cat]}">\${f.desc}</div>\` : ''}
<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px">
  <div style="background:var(--bg);border-radius:8px;padding:10px 12px;text-align:center">
    <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Impact</div>
    <div style="font-size:22px;font-weight:700;color:var(--text)">\${f.impact}</div>
    <div style="font-size:10px;color:var(--text3)">/5</div>
  </div>
  <div style="background:var(--bg);border-radius:8px;padding:10px 12px;text-align:center">
    <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Likelihood</div>
    <div style="font-size:22px;font-weight:700;color:var(--text)">\${f.like}</div>
    <div style="font-size:10px;color:var(--text3)">/5</div>
  </div>
  <div style="background:\${riskColor(s)}18;border-radius:8px;padding:10px 12px;text-align:center;border:1px solid \${riskColor(s)}40">
    <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Risk score</div>
    <div style="font-size:22px;font-weight:700;color:\${riskColor(s)}">\${s}</div>
    <div style="font-size:10px;color:var(--text3)">= I × L</div>
  </div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;margin-bottom:16px">
  \${f.bizImpact ? \`<div><span style="color:var(--text3)">Business impact area: </span><span style="color:var(--text);font-weight:500">\${f.bizImpact}</span></div>\` : ''}
  \${f.date ? \`<div><span style="color:var(--text3)">Next review: </span><span style="color:var(--text);font-weight:500">\${f.date}</span></div>\` : ''}
</div>
<div style="border-top:1px solid var(--border);padding-top:14px;display:flex;justify-content:flex-end;gap:8px">
  <button class="btn btn-outline btn-sm" onclick="closeModal('detailModal')">Close</button>
  <button class="btn btn-outline btn-sm btn-danger" onclick="deleteFactor(\${f.id});closeModal('detailModal')"><i class="fa-solid fa-trash"></i> Delete</button>
  <button class="btn btn-primary btn-sm" onclick="closeModal('detailModal');openEditModal(\${f.id})"><i class="fa-solid fa-pen"></i> Edit</button>
</div>\`
  openModal('detailModal')
}

// ── ADD / EDIT MODAL ──
function openAddModal(preCat) {
  editingId = null
  currentImpact = null; currentLike = null; currentCat = preCat || null
  document.getElementById('addModalTitle').textContent = 'Add strategic factor'
  document.getElementById('fTitle').value = ''
  document.getElementById('fDesc').value = ''
  document.getElementById('fDept').value = ''
  document.getElementById('fBizImpact').value = ''
  document.getElementById('fDate').value = ''
  document.getElementById('fStatus').value = 'green'
  document.querySelectorAll('#impactBtns .sc-btn, #likeBtns .sc-btn').forEach(b => b.classList.remove('on'))
  document.querySelectorAll('#catBtns .cat-btn').forEach(b => { b.classList.remove('on'); b.style.background = ''; b.style.borderColor = '' })
  if (preCat) {
    const btn = document.querySelector(\`#catBtns .cat-btn[data-c="\${preCat}"]\`)
    if (btn) { btn.classList.add('on'); btn.style.background = CAT_COLOR[preCat]; btn.style.borderColor = CAT_COLOR[preCat]; btn.style.color = '#fff' }
  }
  document.getElementById('scorePreview').textContent = '—'
  document.getElementById('scoreZone').textContent = ''
  document.getElementById('scoreZone').className = 'badge'
  openModal('addModal')
}
function openEditModal(id) {
  const f = factors.find(x => x.id === id)
  if (!f) return
  editingId = id
  currentImpact = f.impact; currentLike = f.like; currentCat = f.cat
  document.getElementById('addModalTitle').textContent = 'Edit factor'
  document.getElementById('fTitle').value = f.title
  document.getElementById('fDesc').value = f.desc || ''
  document.getElementById('fDept').value = f.dept || ''
  document.getElementById('fBizImpact').value = f.bizImpact || ''
  document.getElementById('fDate').value = f.date || ''
  document.getElementById('fStatus').value = f.status
  document.querySelectorAll('#catBtns .cat-btn').forEach(b => {
    b.classList.remove('on'); b.style.background = ''; b.style.borderColor = ''; b.style.color = ''
    if (b.dataset.c === f.cat) { b.classList.add('on'); b.style.background = CAT_COLOR[f.cat]; b.style.borderColor = CAT_COLOR[f.cat]; b.style.color = '#fff' }
  })
  document.querySelectorAll('#impactBtns .sc-btn').forEach((b, i) => { b.classList.toggle('on', i + 1 === f.impact) })
  document.querySelectorAll('#likeBtns .sc-btn').forEach((b, i) => { b.classList.toggle('on', i + 1 === f.like) })
  updateScorePreview()
  openModal('addModal')
}
function pickCat(btn) {
  currentCat = btn.dataset.c
  const color = CAT_COLOR[currentCat]
  document.querySelectorAll('#catBtns .cat-btn').forEach(b => { b.classList.remove('on'); b.style.background = ''; b.style.borderColor = ''; b.style.color = '' })
  btn.classList.add('on'); btn.style.background = color; btn.style.borderColor = color; btn.style.color = '#fff'
}
function pickScore(btn, group, val) {
  const groupId = group === 'impact' ? 'impactBtns' : 'likeBtns'
  document.querySelectorAll(\`#\${groupId} .sc-btn\`).forEach(b => b.classList.remove('on'))
  btn.classList.add('on')
  if (group === 'impact') currentImpact = val; else currentLike = val
  updateScorePreview()
}
function updateScorePreview() {
  const prev = document.getElementById('scorePreview')
  const zone = document.getElementById('scoreZone')
  if (currentImpact && currentLike) {
    const s = currentImpact * currentLike
    const z = riskZone(s)
    prev.textContent = s
    prev.style.color = riskColor(s)
    zone.textContent = z.label
    zone.className = 'badge ' + z.cls
  } else {
    prev.textContent = '—'; prev.style.color = 'var(--text)'
    zone.textContent = ''; zone.className = 'badge'
  }
}
function saveFactorFromModal() {
  const title = document.getElementById('fTitle').value.trim()
  if (!title) { toast('Please enter a factor description'); return }
  if (!currentCat) { toast('Please select a category'); return }
  if (!currentImpact) { toast('Please select an impact score'); return }
  if (!currentLike) { toast('Please select a likelihood score'); return }
  const obj = {
    id: editingId || nextId(),
    cat: currentCat, title,
    desc: document.getElementById('fDesc').value.trim(),
    dept: document.getElementById('fDept').value,
    bizImpact: document.getElementById('fBizImpact').value.trim(),
    impact: currentImpact, like: currentLike,
    status: document.getElementById('fStatus').value,
    date: document.getElementById('fDate').value,
  }
  if (editingId) { const i = factors.findIndex(f => f.id === editingId); factors[i] = obj; toast('Factor updated') }
  else { factors.push(obj); toast('Factor added') }
  closeModal('addModal')
  renderAll()
}
function deleteFactor(id) {
  if (!confirm('Delete this factor? It will be removed from all views.')) return
  factors = factors.filter(f => f.id !== id)
  toast('Factor deleted')
  renderAll()
}

// ── Filter ──
function applyFilter() {
  activeFilters.statuses = []
  if (document.getElementById('f_green').checked) activeFilters.statuses.push('green')
  if (document.getElementById('f_amber').checked) activeFilters.statuses.push('amber')
  if (document.getElementById('f_red').checked) activeFilters.statuses.push('red')
  activeFilters.minImpact = parseInt(document.getElementById('f_minImpact').value) || 1
  closeModal('filterModal')
  renderAll()
  toast('Filters applied')
}

// ── Export CSV ──
function exportCSV() {
  const rows = [['ID', 'Category', 'Title', 'Desc', 'Dept', 'BizImpact', 'Impact', 'Likelihood', 'RiskScore', 'Status', 'Date']]
  factors.forEach(f => rows.push([f.id, CAT_LABEL[f.cat], \`"\${f.title}"\`, \`"\${f.desc || ''}"\`, f.dept || '', f.bizImpact || '', f.impact, f.like, f.impact * f.like, f.status, f.date || '']))
  const csv = rows.map(r => r.join(',')).join('\n')
  const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv); a.download = 'strategic-analysis.csv'; a.click()
  toast('CSV exported')
}

// ── Render all active tab ──
function renderAll() {
  const activeTab = document.querySelector('.tab.active')?.textContent.trim()
  buildSwot()
  if (document.getElementById('tab-pestle').style.display !== 'none') buildPestle()
  if (document.getElementById('tab-heatmap').style.display !== 'none') { buildHeatmap(); buildPriority() }
  if (document.getElementById('tab-dashboard').style.display !== 'none') buildDashboard()
}

// ── Init ──
// Show dashboard first
document.getElementById('tab-dashboard').style.display = 'block'
document.getElementById('tab-swot').style.display = 'none'
buildDashboard()
buildSwot()
