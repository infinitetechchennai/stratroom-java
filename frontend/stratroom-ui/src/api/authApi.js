import axios from 'axios'

const authAxios = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000
})

// Login flow is wired to the consolidated backend (stratroom-backend) at /api.
// Other features (loginTheme, forgotPassword) still live in the legacy web layer
// and will be migrated in a later phase; they fail gracefully until then.

export const loginApi = async ({ userName, passWord }) => {
  const response = await authAxios.post('/api/login', {
    userName,
    passWord,
    ssoLogin: false
  })
  return response.data
}

export const validateTokenApi = async (token, userInfo) => {
  const response = await authAxios.get('/api/validateToken', {
    headers: {
      Authorization: `Bearer ${token}`,
      USER_INFO: userInfo
    }
  })
  return response.data
}

export const refreshTokenApi = async (refreshToken, userInfo) => {
  const response = await authAxios.get('/api/generateToken', {
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
  await authAxios.post('/api/preAuditTrail', data)
}
