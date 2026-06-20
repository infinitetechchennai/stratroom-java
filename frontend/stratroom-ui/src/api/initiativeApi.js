import axiosClient from './axiosClient'

// Initiative API layer (scorecard standard view usage), migrated from the legacy
// jQuery pages. Targets the consolidated backend (/api).

export const getInitiativesListByEmpId = async (empId) => {
  const response = await axiosClient.get(`/api/initiativesListByEmpId/${empId}`)
  return response.data
}
