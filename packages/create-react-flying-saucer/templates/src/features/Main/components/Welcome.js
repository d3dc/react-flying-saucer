import { Logo } from './Logo'

function Welcome() {
  return (
    <header className="Main-header">
      <Logo />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="Main-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  )
}

export default Welcome