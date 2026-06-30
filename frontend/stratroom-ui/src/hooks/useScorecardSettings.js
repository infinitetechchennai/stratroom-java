import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCustomPerformanceDetails } from '../api/controlPanelApi';

const ScorecardSettingsContext = createContext();

function parseJsonBlob(resp) {
  if (!resp) return {}
  if (typeof resp === 'string') {
    try { return JSON.parse(resp) } catch { return {} }
  }
  if (resp.customValue) {
    try { return JSON.parse(resp.customValue) } catch { return {} }
  }
  return resp
}

// Normalize values so booleans and strings are handled uniformly:
// { scorecardactual: false } and { scorecardactual: "false" } both become { scorecardactual: "false" }
function normalizeSettings(raw) {
  const out = {}
  for (const [k, v] of Object.entries(raw || {})) {
    out[k] = (v === null || v === undefined) ? '' : String(v)
  }
  return out
}

export const ScorecardSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await getCustomPerformanceDetails();
      setSettings(normalizeSettings(parseJsonBlob(resp)));
    } catch (err) {
      console.error('Failed to fetch scorecard settings:', err);
      setError(err);
      setSettings({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return React.createElement(
    ScorecardSettingsContext.Provider,
    { value: { settings, loading, error, refreshSettings: fetchSettings } },
    children
  );
};

export const useScorecardSettings = () => {
  const context = useContext(ScorecardSettingsContext);
  if (context === undefined) {
    throw new Error('useScorecardSettings must be used within a ScorecardSettingsProvider');
  }
  return context;
};
