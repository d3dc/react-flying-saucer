import { useHooks, useProvided } from '@@'
import { Heading } from 'grommet'

function FourOhFour({ computedMatch }) {
  const [Page] = useProvided('Page')

  return (
    <Page>
      <Heading>404</Heading>
      <span>"{computedMatch.url}" ain't here, chief.</span>
    </Page>
  )
}

export default FourOhFour |> useHooks
