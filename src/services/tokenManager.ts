export const TokenManager = (() => {
  let accessToken: string | null = null

  return {
    setToken: (token: string) => {
      accessToken = token
    },
    getToken: () => {
      return accessToken
    },
    clearToken: () => {
      accessToken = null
    }
  }
})()
