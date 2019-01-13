# react-flying-saucer 🛸

> The 👾 aren't in the bikeshed.

&nbsp;

&nbsp;

A zero-config extension to `create-react-app` for scalable single-page apps with functional react.

**features:**

- 🔗 Compose feature modules as declarative React components
- 🔩 Opinionated syntax from [babel-preset-techno-babel](https://github.com/d3dc/babel-preset-techno-babel) with a focus on composability
- 📬 [Models](https://rematch.gitbooks.io/rematch/docs/api.html#models) provide a bite-size abstraction for redux and keep rendering fast with first-class [selectors](https://rematch.gitbooks.io/rematch/plugins/select/)
- 🧱 Write business logic and data sources as plain modules and let dependency injection handle the rest

- 🔋 Batteries included!

  |                      |                                                                              |                          |
  | -------------------- | ---------------------------------------------------------------------------- | ------------------------ |
  | suspense             | scoped route trees                                                           | dynamic models           |
  | error boundaries     | enhanced [routing components](https://github.com/ReactTraining/react-router) | shorthand redux bindings |
  | contextual constants | composable view side-effects                                                 |

&nbsp;

&nbsp;

---

## Quick Start

- `$npx create-react-flying-saucer app`
- `$cd app`
- `$yarn start`

---

&nbsp;

&nbsp;

## Whats in the Box?

### One-touch bootstrap or migrate

- run the latest `create-react-app` and add `react-flying-saucer`

```sh
$ npx create-react-flying-saucer <project>
```

- add `react-flying-saucer` to an existing app bootstrapped with `create-react-app`

```sh
$ cd <project>
$ npx migrate-react-flying-saucer
```

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

### [exported utilities](docs/api.md)

- [Mothership](/docs/api.md#the-app)
- [Features](/docs/api.md#features)
- [`RematchModel`](/docs/api.md#rematchmodel)
- [`FlyingSaucerView`](/docs/api.md#flyingsaucerview)
- [enhanced routing](/docs/api.md#enhanced-routing)
- [react hooks](/docs/api.md#react-hooks)
- [`context` bindings](/docs/api.md#context-bindings)
- [`redux` bindings](/docs/api.md#redux-bindings)

&nbsp;

&nbsp;

---

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
