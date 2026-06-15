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
    risk: flag(v.riskStatusLight)
  };
}

function mapKpi(kpi) {
  const v = kpi.kpiValue || {};
  return {
    id: kpi.kpiId ?? kpi.id,
    name: v.name,
    actual: v.actual,
    target: v.target,
    baseline: v.baseline,
    period: v.kpi_measurement,
    score: v.thresholdResult,
    flag: flag(v.statusLight),
    trend: flag(v.trend),
    risk: flag(v.riskStatusLight),
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
    children: (obj.kpiList || []).map(mapKpi)
  };
}

function mapScorecard(sc) {
  const v = sc.scoreCardValue || {};
  return {
    id: sc.id,
    title: v.name,
    totalScore: v.thresholdResult,
    perspectiveType: sc.perspectiveType,
    tabledata: (sc.objectiveList || []).map(mapObjective)
  };
}

// Returns the single-scorecard object ScorecardPage expects: { tab: [...] }
export function cardDetailsToTabs(dto) {
  const scoreCardDTOS = dto?.cardDetailsDTO?.scoreCardDTOS;
  if (!Array.isArray(scoreCardDTOS) || scoreCardDTOS.length === 0) return null;
  return { tab: scoreCardDTOS.map(mapScorecard) };
}
