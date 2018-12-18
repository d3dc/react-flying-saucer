const delay = t => new Promise(resolve => setTimeout(resolve, t))

const initialAccountState = {
  me: null,
  authenticated: false,
}

const account = {
  name: 'account',
  state: initialAccountState,
  reducers: {
    logout(state, payload) {
      return initialAccountState
    },
    authenticated(state, { username }) {
      return {
        ...state,
        me: { username },
        authenticated: true,
      }
    },
  },
  effects: {
    async login(state, { username, password }) {
      // Here, you should call your authentication
      // and store a token, etc.
      // Instead, we just wait 3 seconds.
      await delay(3000)
      return this.authenticated({ username })
    },
  },
  selectors: slice => ({
    isLoggedIn() {
      return slice(_.authenticated)
    },
    me() {
      return slice(_.me)
    },
  }),
}

export default [account]
