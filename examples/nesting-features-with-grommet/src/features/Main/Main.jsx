import { Grommet, Stack } from 'grommet'

function Main({ children }) {
  return (
    <Grommet full>
      <Stack fill anchor="top-left">
        {children}
      </Stack>
    </Grommet>
  )
}

export default Main
