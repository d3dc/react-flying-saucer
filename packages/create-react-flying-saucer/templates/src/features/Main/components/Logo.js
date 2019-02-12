import { useProvided } from '@@'

function Logo() {
  const [logoSrc] = useProvided('logoSrc')
  return <img src={logoSrc} className="Main-logo" alt="logo" />
}

export default Logo
