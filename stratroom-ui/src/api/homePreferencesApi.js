import axiosClient from './axiosClient'

export const getHomePreferences = async (empId) => {
  const response = await axiosClient.get(`/api/homePagePreferences/${empId}`)
  return response.data
}

export const saveHomePreferences = async (data) => {
  const response = await axiosClient.post('/api/homePagePreferences', data)
  return response.data
}
