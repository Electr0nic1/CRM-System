export default class TokenManager {
  static #accessToken: string | null = null;

  static setToken(accessToken: string) {
    this.#accessToken = accessToken
  }

  static getToken() {
    return this.#accessToken
  }

  static clearToken() {
    this.#accessToken = null
  }
  
}
