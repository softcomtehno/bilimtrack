import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios'
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'

const API_URL = 'https://bilimtrack.makalabox.com/api/'
const ACCESS_TOKEN_KEY = 'access'
const REFRESH_TOKEN_KEY = 'refresh'

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

const getAccessToken = (): string | null => {
  const token: string | undefined = getCookie(ACCESS_TOKEN_KEY)
  // if (token) console.log('[Tokens] Access Token:', token)
  // else console.log('[Tokens] Access Token: null')
  return token ?? null
}

const getRefreshToken = (): string | null => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY)
  // if (token) console.log('[Tokens] Refresh Token:', token)
  // else console.log('[Tokens] Refresh Token: null')
  return token
}

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

$api.interceptors.response.use(
  (response) => {
    // При успешном ответе можно вывести токены тоже, если хочешь
    // console.log('[Tokens] Response received')
    getAccessToken()
    getRefreshToken()
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              if (originalRequest.headers && typeof token === 'string') {
                originalRequest.headers.Authorization = `Bearer ${token}`
              }
              resolve($api(originalRequest))
            },
            reject,
          })
        })
      }

      isRefreshing = true

      try {
        const refreshToken = getRefreshToken()
        if (!refreshToken) throw new Error('Refresh token not found')

        const { data } = await axios.post<{ access: string }>(
          `${API_URL}jwt/refresh/`,
          { refresh: refreshToken },
          { withCredentials: true }
        )

        // console.log('[Tokens] Refreshed Access Token:', data.access)

        setCookie(ACCESS_TOKEN_KEY, data.access, {
          sameSite: 'Strict',
          secure: true,
        })

        processQueue(null, data.access)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.access}`
        }

        return $api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null)
        localStorage.removeItem(REFRESH_TOKEN_KEY)
        removeCookie(ACCESS_TOKEN_KEY)
        // console.log('[Tokens] Refresh failed, tokens cleared')
        window.location.href = '/auth'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default $api
