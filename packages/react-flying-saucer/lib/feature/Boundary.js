import { Suspense, Component } from 'react'

export default class Boundary extends Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError = error => ({
    hasError: true,
  })

  render() {
    if (this.state.hasError) {
      const { recovery = <div>Error!</div>, ...rest } = this.props
      return recovery
    } else {
      const { fallback = <div>Loading...</div>, ...rest } = this.props
      return <Suspense fallback={fallback} {...rest} />
    }
  }
}
