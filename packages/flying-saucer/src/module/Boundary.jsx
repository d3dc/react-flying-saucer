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
      return this.props.recovery
    } else {
      const { fallback = <div>Loading...</div>, ...rest } = this.props
      return <Suspense fallback={fallback} {...rest} />
    }
  }
}
