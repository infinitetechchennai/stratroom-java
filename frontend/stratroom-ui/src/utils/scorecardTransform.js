// Transforms the backend scorecard payload (cardDetailsDTO.scoreCardDTOS, the
// shape standard_view.js consumes) into the tab/tabledata/children shape the
// revamp ScorecardPage components render. This is the inverse of the mock
// mapping in useScorecard.js, so the new UI works against live backend data.

const flag = (status) => (status ? [{ status }] : []);

function mapSubKpi(sub) {
  const v = sub.subKpiValue || {};
  return {
    id: sub.subKpiId ?? sub.id,
    name: v.subMeasureName ?? v.name,
    actual: v.actual,
    target: v.target,
    baseline: v.baseline,
    period: v.kpi_measurement,
    score: v.thresholdResult,
    flag: flag(v.statusLight),
    trend: flag(v.trend),
    risk: flag(v.riskStatusLight),
    pk: sub.id
  };
}

function mapKpi(kpi) {
  const v = kpi.kpiValue || {};
  return {
    id: kpi.kpiId ?? kpi.id,
    // Numeric DB primary key — needed for the KPI story-card API calls
    // (the displayed `id` above is the business code, e.g. "OB01").
    kpiPk: kpi.id,
    name: v.name,
    actual: v.actual,
    target: v.target,
    baseline: v.baseline,
    period: v.kpi_measurement,
    score: v.thresholdResult,
    owner: v.ownerName || kpi.ownerName || v.owner || kpi.owner || v.ownerId,
    flag: flag(v.statusLight),
    trend: flag(v.trend),
    risk: flag(v.riskStatusLight),
    pk: kpi.id,
    children: (kpi.subKpiList || []).map(mapSubKpi)
  };
}

function mapObjective(obj) {
  const v = obj.objectivesValue || {};
  return {
    id: obj.objectiveId ?? obj.id,
    name: v.name,
    score: v.thresholdResult,
    flag: flag(v.statusLight),
    pk: obj.id,
    children: (obj.kpiList || []).map(kpi => {
      const mapped = mapKpi(kpi);
      mapped.alignment = v.name;
      return mapped;
    })
  };
}

function mapScorecard(sc) {
  const v = sc.scoreCardValue || {};
  const resolvedName = v.modifyName || v.name || sc.perspectiveType || sc.code || `Perspective ${sc.id}`;
  return {
    id: sc.id,
    title: resolvedName,
    totalScore: v.thresholdResult,
    perspectiveType: v.modifyeType || resolvedName,
    pk: sc.id,
    tabledata: (sc.objectiveList || []).map(mapObjective)
  };
}

// Returns the single-scorecard object ScorecardPage expects: { tab: [...] }
// plus the scorecard name and overall score (used by the PDF/Excel export).
export function cardDetailsToTabs(dto) {
  const card = dto?.cardDetailsDTO;
  const scoreCardDTOS = card?.scoreCardDTOS;
  if (!Array.isArray(scoreCardDTOS) || scoreCardDTOS.length === 0) return null;
  return {
    tab: scoreCardDTOS.map(mapScorecard),
    scorecardName: card.scorecardName ?? card.scoreCardName ?? 'Scorecard',
    overallScore: card.thresholdResult ?? '',
    scoreCardDetailsId: card.id ?? card.scoreCardDetailsId,
    // Raw scorecard fields so the Settings modal can pre-fill name/description/formula.
    rawCard: {
      id: card.id ?? card.scoreCardDetailsId,
      pageId: card.pageId,
      scorecardName: card.scorecardName ?? card.scoreCardName ?? '',
      description: card.description ?? '',
      formula: card.formula ?? '',
    },
  };
}
