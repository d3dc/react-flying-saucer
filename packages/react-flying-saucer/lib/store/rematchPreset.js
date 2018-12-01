import selectPlugin from '@rematch/select'

export default {
  redux: {
    middlewares: [
      store => next => action => {
        console.log('dispatching', action)
        let result = next(action)
        console.log('next state', store.getState())
        return result
      },
    ],
  },
  plugins: [selectPlugin()],
}
