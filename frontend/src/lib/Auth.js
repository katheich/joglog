import { AUTH_TOKEN } from './constants'


function setToken(token) {
  localStorage.setItem(AUTH_TOKEN, token)
}

function getToken() {
  return localStorage.getItem(AUTH_TOKEN)
}

function logout() {
  localStorage.removeItem(AUTH_TOKEN)
}

function getUserId() {
  const token = this.getToken()
  if (!token) return false
  const parts = token.split('.')
  return JSON.parse(atob(parts[1])).sub
}

function isAuthorized() {
  return this.getToken()
}


exports.setToken = setToken
exports.getToken = getToken
exports.logout = logout
exports.getUserId = getUserId
exports.isAuthorized = isAuthorized