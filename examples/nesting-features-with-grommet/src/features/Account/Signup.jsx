import { _$, useHooks, useState, useCallback, useNavigator } from '@@'
import { Box, Heading, FormField, TextInput, Button } from 'grommet'

const enhance = _$(dispatch => ({
  signup: dispatch.account.signup,
}))

function Signup({ signup }) {
  const [email, updateEmail] = useState('')
  const [username, updateUsername] = useState('')
  const [password, updatePassword] = useState('')
  const [loading, updateLoading] = useState(false)

  const nav = useNavigator()

  const submit = useCallback(
    async () => {
      await updateLoading(true)
      await signup({ email, username, password })
      return nav.start()
    },
    [state, nav]
  )

  return (
    <Box width="50%">
      <Heading>Signup</Heading>
      <FormField label="Email">
        <TextInput
          key="email"
          type="text"
          disabled={loading}
          value={email}
          onChange={event => updateEmail(event.target.value)}
        />
      </FormField>
      <FormField label="Username">
        <TextInput
          key="username"
          type="text"
          disabled={loading}
          value={username}
          onChange={event => updateUsername(event.target.value)}
        />
      </FormField>
      <FormField label="Password">
        <TextInput
          key="password"
          type="password"
          disabled={loading}
          value={password}
          onChange={event => updatePassword(event.target.value)}
        />
      </FormField>
      <Button label="Signup" disabled={loading} onClick={submit} />
    </Box>
  )
}

export default Signup |> useHooks |> enhance
