import { useState, useEffect, useCallback } from 'react';
import {
  getScorecardDetails,
  getModulePermissions,
  getPreferences,
  getReporteeList
} from '../services/scorecardApi';

// Flip to true to render from /mockScorecard.json without a backend.
const MOCK_MODE = false;

export const useScorecard = (pageId) => {
  const [scorecardData, setScorecardData] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [reporteeList, setReporteeList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    if (!pageId) return;

    setLoading(true);
    setError(null);

    try {
      if (MOCK_MODE) {
        const res = await fetch('/mockScorecard.json');
        if (!res.ok) throw new Error('Mock fetch failed');
        const rawData = await res.json();

        const transformedDTO = {
          cardDetailsDTO: {
            scoreCardDTOS: rawData[0].tab.map(t => ({
              id: t.title,
              scoreCardValue: {
                name: t.title,
                statusLight: "green",
                thresholdResult: t.totalScore || "100"
              },
              objectiveList: t.tabledata.map(obj => ({
                id: obj.id,
                objectiveId: obj.id,
                objectivesValue: {
                  name: obj.name,
                  statusLight: obj.flag?.[0]?.status || "green",
                  thresholdResult: obj.score
                },
                kpiList: obj.children?.map(kpi => ({
                  id: kpi.id,
                  kpiId: kpi.id,
                  kpiValue: {
                    name: kpi.name,
                    actual: kpi.actual,
                    target: kpi.target,
                    kpi_measurement: kpi.period,
                    trend: kpi.trend?.[0]?.status || "up",
                    riskStatusLight: kpi.risk?.[0]?.status || "green",
                    statusLight: kpi.flag?.[0]?.status || "green",
                    thresholdResult: kpi.score
                  },
                  subKpiList: kpi.children?.map(sub => ({
                    id: sub.id,
                    subKpiId: sub.id,
                    subKpiValue: {
                      subMeasureName: sub.name,
                      actual: sub.actual,
                      target: sub.target,
                      kpi_measurement: sub.period,
                      trend: sub.trend?.[0]?.status || "up",
                      riskStatusLight: sub.risk?.[0]?.status || "green",
                      statusLight: sub.flag?.[0]?.status || "green",
                      thresholdResult: sub.score
                    }
                  })) || []
                })) || []
              }))
            }))
          }
        };

        setScorecardData(transformedDTO);
        setPermissions({});
        setPreferences({});
        setReporteeList([]);
      } else {
        // Use Promise.allSettled so that failures in permissions/preferences/reporteeList
        // don't prevent the scorecard data from loading and rendering.
        // Only scorecardData is critical — the rest are supplementary.
        const [
          permissionsResult,
          preferencesResult,
          reporteeListResult,
          scorecardDataResult,
        ] = await Promise.allSettled([
          getModulePermissions(),
          getPreferences(pageId),
          getReporteeList(),
          getScorecardDetails(pageId),
        ]);

        // Apply results — use null/empty defaults for non-critical failures
        setPermissions(permissionsResult.status === 'fulfilled' ? permissionsResult.value : null);
        setPreferences(preferencesResult.status === 'fulfilled' ? preferencesResult.value : null);
        setReporteeList(reporteeListResult.status === 'fulfilled' ? reporteeListResult.value : []);

        if (scorecardDataResult.status === 'fulfilled') {
          setScorecardData(scorecardDataResult.value);
        } else {
          // Scorecard fetch failed — surface a user-friendly error
          console.error('Scorecard data fetch failed:', scorecardDataResult.reason);
          setError(scorecardDataResult.reason?.message || 'Failed to load scorecard data from server.');
        }

        // Log non-critical failures for debugging without blocking the UI
        if (permissionsResult.status === 'rejected') {
          console.warn('Permissions fetch failed (non-fatal):', permissionsResult.reason?.message);
        }
        if (preferencesResult.status === 'rejected') {
          console.warn('Preferences fetch failed (non-fatal):', preferencesResult.reason?.message);
        }
        if (reporteeListResult.status === 'rejected') {
          console.warn('Reportee list fetch failed (non-fatal):', reporteeListResult.reason?.message);
        }
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while loading scorecard data.');
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    scorecardData,
    permissions,
    preferences,
    reporteeList,
    loading,
    error,
    reload: loadData
  };
};
