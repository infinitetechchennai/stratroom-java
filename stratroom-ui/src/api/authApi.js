import axios from 'axios'

const authAxios = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000
})

export const loginApi = async ({ userName, passWord }) => {
  const response = await authAxios.post('/authservice/login', {
    userName,
    passWord,
    ssoLogin: false
  })
  return response.data
}

export const validateTokenApi = async (token, userInfo) => {
  const response = await authAxios.get('/authservice/validateToken', {
    headers: {
      Authorization: `Bearer ${token}`,
      USER_INFO: userInfo
    }
  })
  return response.data
}

export const refreshTokenApi = async (refreshToken, userInfo) => {
  const response = await authAxios.get('/authservice/generateToken', {
    headers: {
      REFRESH_TOKEN: refreshToken,
      USER_INFO: userInfo
    }
  })
  return response.data
}

export const forgotPasswordApi = async (userName) => {
  const response = await authAxios.post('/stratroom/forgotPassword', { userName })
  return response.data
}

export const fetchLoginTheme = async () => {
  const response = await authAxios.get('/stratroom/loginTheme')
  return response.data
}

export const postPreAuditTrail = async (data) => {
  await authAxios.post('/stratroom/preAuditTrail', data)
}
