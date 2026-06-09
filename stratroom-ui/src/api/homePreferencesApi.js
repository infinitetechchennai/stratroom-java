import axiosClient from './axiosClient'

export const getHomePreferences = async (empId) => {
  const response = await axiosClient.get(`/scorecard-service/homePagePreferences/${empId}`)
  return response.data
}

export const saveHomePreferences = async (data) => {
  const response = await axiosClient.post('/scorecard-service/homePagePreferences', data)
  return response.data
}
