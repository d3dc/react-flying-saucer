# react-flying-saucer 🛸

> The 👾 aren't in the bikeshed.

A zero-config extension to `create-react-app` for scalable single-page apps with functional react.

**features:**

- 🔋 All the batteries are included - including [routing](https://github.com/ReactTraining/react-router)
- 🔗 Compose feature modules as declarative React components
- 🕳 opinionated syntax from [babel-preset-techno-babel](https://github.com/d3dc/babel-preset-techno-babel)
- 📬 dispatch changes through redux to encapsulated [rematch models](https://rematch.gitbooks.io/rematch/docs/api.html#models)
- 📝 memoize updating from your redux state using [rematch selectors](https://rematch.gitbooks.io/rematch/plugins/select/)
- 📍 Top-level data is injected in models, while features can provide and use constants.

## Quick Start

- `$npx create-react-flying-saucer app`
- `$cd app`
- `$yarn start`

## Whats in the Box?

### new project or upgrade

```sh
$ create-react-flying-saucer
```
run the latest `create-react-app` and add `react-flying-saucer`

```sh
$ migrate-react-flying-saucer
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

### "example" app

```js
const App = () => (
  <Mothership>
    <UI>
      <FeatureOne />
      <FeatureTwo path="/showTwo" />
    </UI>
  </Mothership>
)
```

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
  - Primitive building blocks for stellar apps!

## Polyfills and patches

Includes code that disappears when these are released:

- [ ] `react-router@4.4`
  - Feature scope re-provides router.
  - polyfills `useRouter()` hook
- [ ] `react@16.7`
  - adds per component polyfill `useHooks()`
  - must import hooks from `react-mothership`

## Typescript when?!

As soon as @rematch/rematch fixes its core typings.
