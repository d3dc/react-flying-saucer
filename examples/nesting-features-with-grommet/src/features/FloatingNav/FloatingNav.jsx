import { $$, useHooks } from '@@'
import { Box, Menu } from 'grommet'
import { Menu as MenuIcon } from 'grommet-icons'

import useMenus from './useMenus'

const enhance = $$(select => ({
  loggedIn: select.account.isLoggedIn,
}))

const style = {
  zIndex: 10000,
}

function FloatingNav({ loggedIn, match, location, history, ...rest }) {
  const menus = useMenus(loggedIn)
  return (
    <Menu
      style={style}
      size="large"
      rounded="small"
      margin={{ left: 'small', top: 'large' }}
      dropAlign={{ top: 'top', left: 'left' }}
      items={menus}
      icon={
        <Box
          background={{ color: 'brand', dark: false }}
          pad="medium"
          elevation="small"
          justify="center"
          align="center"
          flex={false}
          round="full"
          {...rest}
        >
          <MenuIcon color="white" />
        </Box>
      }
    />
  )
}

export default FloatingNav |> useHooks |> enhance
