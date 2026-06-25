import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/',
  timeout: 30000,
})

function readSessionProfile() {
  try {
    const raw = localStorage.getItem('profile')
    if (!raw) return null
    const profile = JSON.parse(raw)
    if (profile && !profile.empId && profile.id) {
      profile.empId = profile.id
    }
    return profile
  } catch {
    return null
  }
}

function isEncryptedUserInfo(value) {
  return typeof value === 'string' && value.startsWith('ENC(')
}

function isFormDataBody(data) {
  return typeof FormData !== 'undefined' && data instanceof FormData
}

/** Mirrors stratroom-web RequestSessionUtil / CommonHttpClientInterceptor headers. */
function applyStratroomSessionHeaders(config) {
  const profile = readSessionProfile()
  if (!profile) return config

  const empId = profile.empId ?? profile.id
  const orgId = profile.orgDetails?.orgId ?? profile.orgId
  const deptId = profile.deptDetails?.id ?? profile.deptId

  if (empId != null && empId !== '') {
    config.headers.LOGGED_IN_EMPLOYEE_ID = String(empId)
    config.headers.SUPER_USER_ID = String(empId)
  }
  if (orgId != null && orgId !== '') {
    config.headers.USER_ORG_ID = String(orgId)
  }
  if (deptId != null && deptId !== '') {
    config.headers.LOGGED_IN_DEPT_ID = String(deptId)
    config.headers.LOGGED_IN_DEPT_ID_FIELD = String(deptId)
  }

  const datePeriod = localStorage.getItem('customperiod') || (() => {
    const y = new Date().getFullYear()
    return `01/01/${y}-12/31/${y}`
  })()
  config.headers.DATE_PERIOD = datePeriod

  return config
}

function applyAuthHeaders(config) {
  config.headers = axios.AxiosHeaders.from(config.headers ?? {})

  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  const userInfo = localStorage.getItem('userInfo')
  if (isEncryptedUserInfo(userInfo)) {
    config.headers.set('USER_INFO', userInfo)
  }

  if (isFormDataBody(config.data)) {
    // Browser must set multipart boundary — never force application/json.
    config.headers.delete('Content-Type')
  } else if (!config.headers.get('Content-Type')) {
    config.headers.set('Content-Type', 'application/json')
  }

  return applyStratroomSessionHeaders(config)
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken')
  const userInfo = localStorage.getItem('userInfo')
  if (!refreshToken || !isEncryptedUserInfo(userInfo)) {
    return null
  }
  const res = await axios.get('/api/generateToken', {
    headers: {
      REFRESH_TOKEN: refreshToken,
      USER_INFO: userInfo
    }
  })
  const newToken = res.data?.token
  if (newToken) {
    localStorage.setItem('accessToken', newToken)
  }
  return newToken || null
}

function redirectToLogin() {
  localStorage.clear()
  window.location.href = '/login'
}

axiosClient.interceptors.request.use(
  (config) => applyAuthHeaders(config),
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const status = error.response?.status

    if ((status === 401 || status === 403) && original && !original._retry) {
      original._retry = true
      try {
        const newToken = await refreshAccessToken()
        if (newToken) {
          original.headers = original.headers || {}
          original.headers.Authorization = `Bearer ${newToken}`
          return axiosClient(original)
        }
      } catch {
        redirectToLogin()
        return Promise.reject(error)
      }
      redirectToLogin()
    }

    return Promise.reject(error)
  }
)

export default axiosClient
