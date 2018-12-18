import { useNavigator } from '@@'
import { Box } from 'grommet'
import { Home, Login, Logout, UserAdd } from 'grommet-icons'

export default function(loggedIn) {
  const navigate = useNavigator()
  return loggedIn
    ? [
        {
          label: 'Start',
          icon: (
            <Box margin={{ right: 'small' }}>
              <Home />
            </Box>
          ),
          onClick: navigate.start,
        },
        {
          label: 'Log out',
          icon: (
            <Box margin={{ right: 'small' }}>
              <Logout />
            </Box>
          ),
          onClick: navigate.logout,
        },
      ]
    : [
        {
          label: 'Start',
          icon: (
            <Box margin={{ right: 'small' }}>
              <Home />
            </Box>
          ),
          onClick: navigate.start,
        },
        {
          label: 'Log in',
          icon: (
            <Box margin={{ right: 'small' }}>
              <Login />
            </Box>
          ),
          onClick: navigate.login,
        },
        {
          label: 'Sign up',
          icon: (
            <Box margin={{ right: 'small' }}>
              <UserAdd />
            </Box>
          ),
          onClick: navigate.signup,
        },
      ]
}
