import axiosClient from './axiosClient'

export const getPageList = async (empId) => {
  const response = await axiosClient.get(`/scorecard-service/pageList/${empId}`)
  return response.data
}

export const getPageDetails = async (pageId) => {
  const response = await axiosClient.get(`/scorecard-service/pages/${pageId}`)
  return response.data
}
