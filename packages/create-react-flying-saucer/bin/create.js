#!/usr/bin/env node
const path = require('path')
const execSync = require('child_process').execSync

const args = process.argv.slice(2).join(' ')

const craPath = path.resolve(
  __dirname,
  '../node_modules/create-react-app/index.js'
)

const codemodPath = path.resolve(__dirname, './codemod.js')

try {
  execSync(`${craPath} ${args}`, { stdio: 'inherit' })
  execSync(`${codemodPath} ${args}`, { stdio: 'inherit' })
} catch (e) {
  /*stderr is inherited*/
}
