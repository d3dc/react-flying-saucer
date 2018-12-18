import { useHooks, useProvided } from '@@'

function Account(props) {
  const [Page] = useProvided('Page')
  return <Page {...props} />
}

export default Account |> useHooks
