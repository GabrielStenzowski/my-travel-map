import { getCookie } from 'cookies-next'

async function cookieGetRefreshToken() {
  return getCookie('refreshToken')
}

export { cookieGetRefreshToken }
