import { useProvided } from '@@'

export default function Welcome() {
  const { Logo } = useProvided()
  return (
    <header className="Main-header">
      <Logo />
      <p>
        Edit <code>src/Main.js</code> and save to reload.
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
