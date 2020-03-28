import { AUTH_TOKEN } from './constants'

class Auth {
  static setToken(token) {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  
  static getToken() {
    return localStorage.getItem(AUTH_TOKEN)
  }
  
  static logout() {
    localStorage.removeItem(AUTH_TOKEN)
  }
  
  static getUserId() {
    const token = this.getToken()
    if (!token) return false
    const parts = token.split('.')
    return JSON.parse(atob(parts[1])).sub
  }
  
  static isAuthorized() {
    return this.getToken()
  }
}

export default Auth