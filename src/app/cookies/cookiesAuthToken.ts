import { setCookie, deleteCookie, getCookie } from 'cookies-next'
import { AUTH_TOKEN_COKIE } from './cookiesConfig'

async function cookieGetToken() {
  return getCookie(AUTH_TOKEN_COKIE)
}

async function cookieTokenAuthSave(token: string) {
  setCookie(AUTH_TOKEN_COKIE, token, {
    path: '/',
  })
}

async function cookieTokenAuthDelete() {
  deleteCookie(AUTH_TOKEN_COKIE)
}

export { cookieGetToken, cookieTokenAuthSave, cookieTokenAuthDelete }
