import commander from 'commander'
import pkg from '../package.json'

require('create-react-app')

let projectName

const program = new commander.Command(pkg.name)
  .version(pkg.version)
  .arguments('<project-directory>')
  .action(name => {
    projectName = name
  })
  .parse(process.argv)

require('./codemod')(projectName)
