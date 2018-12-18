import { Box } from 'grommet'

export default function Cover(props) {
  return (
    <Box
      align="center"
      justify="center"
      width="100vw"
      height="100vh"
      pad="medium"
      overflow="scroll"
      {...props}
    />
  )
}
