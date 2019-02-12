import { $$, useProvided, Link } from '@@'
import logo from './logo.svg'

const enhance = $$(select => ({
  loggedIn: select.account.isLoggedIn,
}))

function Start({ loggedIn }) {
  const [Page] = useProvided('Page')
  return (
    <Page>
      {!loggedIn ? (
        <>
          <p>This view is a secret...</p>
          <Link view="login">Log in to see it</Link>
        </>
      ) : (
        <>
          <img src={logo} className="App-logo" alt="logo" />
          <p>You're logged in!</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </>
      )}
    </Page>
  )
}

export default Start |> enhance
