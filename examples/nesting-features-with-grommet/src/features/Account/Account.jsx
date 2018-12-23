import { useHooks, useProvided } from '@@'

function Account(props) {
  const [Page] = useProvided('Page')
  return <Page {...props} />
}

Account.displayName = 'Account'

export default Account |> useHooks
