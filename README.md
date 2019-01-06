# react-flying-saucer 🛸

> The 👾 aren't in the bikeshed.

A zero-config extension to `create-react-app` for scalable single-page apps with functional react.

**features:**

- 🔗 Compose feature modules as declarative React components
- 🔩 Opinionated syntax from [babel-preset-techno-babel](https://github.com/d3dc/babel-preset-techno-babel)
- 📬 Dispatch changes through redux to encapsulated [rematch models](https://rematch.gitbooks.io/rematch/docs/api.html#models)
- 📝 Memoize updating from your redux state using [rematch selectors](https://rematch.gitbooks.io/rematch/plugins/select/)
- 📍 Top-level data sources are accessible in every feature's models.

- 🔋 Batteries included!
  - suspense
  - error boundaries
  - contextual constants
  - scoped route trees
  - dynamic models
  - enhanced [routing components](https://github.com/ReactTraining/react-router)

## Quick Start

- `$npx create-react-flying-saucer app`
- `$cd app`
- `$yarn start`

## Whats in the Box?

### new project or upgrade

```sh
$ npx create-react-flying-saucer <project>
```
run the latest `create-react-app` and add `react-flying-saucer`

```sh
$ cd <project>
$ npx migrate-react-flying-saucer
```
add `react-flying-saucer` to an existing app bootstrapped with `create-react-app`

### import aliases

> One flying saucer, Two flying saucers

`@`

A link to the source root of your project.

`@@`

[re-exports](#exported-utilities) everything you need for creating and mounting a feature fleet.

```js
import { $$ } from '@@'
import Sidebar from '@/features/sidebar'
```

### dot files

`react-flying-saucer` respects any `.babelrc` and `.eslintrc` configuration files. Any additional configuration your project needs can be added directly to these files.

### exported utilities

- [`Mothership` to assemble your feature fleet](docs/api.md#mothership-)
- [`createApp` to declare data sources for the Mothership](docs/api.md#createappconfig)
- [`createFeature` to declare views, models, and ambient dependencies for a feature](docs/api.md#createfeatureconfig)
- [`createModel` to create encapsulated redux logic for a feature](docs/api.md#createModel)
- [`redux` bindings](docs/api.md#redux-bindings)
- [`context` bindings](docs/api.md#context-bindings)

## Examples

- [TodoMVC](examples/todos)
- [Nesting Features](examples/nesting-features-with-grommet)

## More Reading

- [API](docs/api.md)
- [WIP][getting started](docs/gettting-started.md)
- [WIP][standalone mothership](docs/standalone-mothership.md)

## Packages

- [create-react-flying-saucer](packages/create-react-flying-saucer)
  - create a create-react-app app and then codemod it to outerspace!
- [react-flying-saucer](packages/react-flying-saucer)
  - npm scripts for a react experience that's out of this world!
- [react-mothership](packages/react-mothership)
  - react primitives for building stellar apps!

## Polyfills and patches

Includes code that disappears when these are released:

- [ ] `react@16.8`
  - adds per component polyfill [`useHooks()`](https://github.com/tannerlinsley/use-react-hooks)
  - must import hooks from `react-mothership`

## Typescript when?!

As soon as @rematch/rematch fixes its core typings.
