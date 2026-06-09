import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      config.headers['USER_INFO'] = userInfo
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refreshToken = localStorage.getItem('refreshToken')
      const userInfo = localStorage.getItem('userInfo')
      if (refreshToken && userInfo) {
        try {
          const res = await axios.get('/authservice/generateToken', {
            headers: {
              REFRESH_TOKEN: refreshToken,
              USER_INFO: userInfo
            }
          })
          const newToken = res.data.token
          localStorage.setItem('accessToken', newToken)
          original.headers['Authorization'] = `Bearer ${newToken}`
          return axiosClient(original)
        } catch {
          localStorage.clear()
          window.location.href = '/login'
        }
      } else {
        localStorage.clear()
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosClient
