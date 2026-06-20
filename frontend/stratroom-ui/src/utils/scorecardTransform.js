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
    children: (obj.kpiList || []).map(mapKpi)
  };
}

function mapScorecard(sc) {
  const v = sc.scoreCardValue || {};
  return {
    id: sc.id,
    title: v.modifyName || v.name,
    totalScore: v.thresholdResult,
    perspectiveType: v.modifyeType || sc.perspectiveType,
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
  };
}
