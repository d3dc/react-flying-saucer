import React from 'react'
import ReactDOM from 'react-dom'
import Boundary from './Boundary'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Boundary />, div)
  ReactDOM.unmountComponentAtNode(div)
})
