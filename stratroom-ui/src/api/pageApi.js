import axiosClient from './axiosClient'

export const getPageList = async (empId) => {
  const response = await axiosClient.get(`/api/pageList/${empId}`)
  return response.data
}

export const getPageDetails = async (pageId) => {
  const response = await axiosClient.get(`/api/pages/${pageId}`)
  return response.data
}
