import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCustomPerformanceDetails } from '../api/controlPanelApi';

const ScorecardSettingsContext = createContext();

export const ScorecardSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCustomPerformanceDetails();
      
      // The backend returns a map that contains 'customValue' as a JSON string,
      // or directly the parsed custom performance object depending on the controller return.
      // In ControlPanelGeneralController.java:
      // findCustomPerformanceByOrgId() returns a Map<String, Object> 
      // containing the parsed customValue. Let's assume it's directly accessible.
      
      setSettings(data || {});
    } catch (err) {
      console.error('Failed to fetch scorecard settings:', err);
      setError(err);
      // Fallback to empty settings so the app doesn't crash
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
