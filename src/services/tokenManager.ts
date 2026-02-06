class TokenManager {
 #accessToken: string | null = null;

  setToken(accessToken: string) {
    this.#accessToken = accessToken
  }

  getToken() {
    return this.#accessToken
  }

  clearToken() {
    this.#accessToken = null
  }
  
}

export default new TokenManager()