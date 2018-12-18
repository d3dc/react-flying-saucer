import { _$, useHooks, useState, useNavigator } from '@@'
import { Box, Heading, FormField, TextInput, Button } from 'grommet'

const enhance = _$(dispatch => ({
  login: dispatch.account.login,
}))

function Signup({ login }) {
  const [state, setState] = useState({
    username: '',
    password: '',
    loading: false,
  })
  const nav = useNavigator()

  return (
    <Box width="50%">
      <Heading>Signup</Heading>
      <FormField label="Username">
        <TextInput
          key="username"
          type="text"
          disabled={state.loading}
          value={state.username}
          onChange={event => setState({ username: event.target.value })}
        />
      </FormField>
      <FormField label="Password">
        <TextInput
          key="password"
          type="password"
          disabled={state.loading}
          value={state.password}
          onChange={event => setState({ password: event.target.value })}
        />
      </FormField>
      <Button
        label="Signup"
        disabled={state.loading}
        onClick={async () => {
          const { username, password } = state
          setState({ loading: true })
          await login({ username, password })
          nav.start()
        }}
      />
    </Box>
  )
}

export default Signup |> useHooks |> enhance
