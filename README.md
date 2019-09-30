# react-flying-saucer 🛸

> The 👾 aren't in the bikeshed.

&nbsp;

&nbsp;

A simple framework built on top of `create-react-app` for scalable single-page apps with functional react.

Tries to get out of the way by using only next generation JavaScript features and React spacedust.

**features:**

- 🔗 Compose feature modules as declarative React components
- 🔩 Build functional pipelines with opinionated syntax from [babel-preset-techno-babel](https://github.com/d3dc/babel-preset-techno-babel).
- 📬 [Models](https://rematch.gitbooks.io/rematch/docs/api.html#models) provide a bite-size abstraction for redux and keep rendering fast with first-class [selectors](https://rematch.gitbooks.io/rematch/plugins/select/)
- 🧱 Write business logic and data sources as plain modules and let dependency injection handle the rest

- 🔋 Batteries included!

  |                      |                                                                              |                          |
  | -------------------- | ---------------------------------------------------------------------------- | ------------------------ |
  | suspense             | scoped route trees                                                           | dynamic models           |
  | error boundaries     | enhanced [routing components](https://github.com/ReactTraining/react-router) | shorthand redux bindings |
  | contextual constants | composable view side-effects                                                 | automatic react import

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

`react-flying-saucer` proposes two declarative react primitives to build your app with. It abstracts outside effects (navigation) and redux state to an "app" container provided by a `Mothership`. Using React semantics, the mothership declaratively lists the `Features` that modify and listen to this context - preserving redux state scoping and feature component lazy loading.

```jsx
<Mothership>
    <FormsProvider>
        <Dashboard path="/dash">
            <GlobalStats />
            <TimerBar />
        </Dashboard>
        <Account
            path="/"
            loggedInView="Dashboard"
        />
    </FormsProvider>
</Mothership>

```

### [Simple API](docs/api.md)

- [Mothership](/docs/api.md#the-app)
- [Features](/docs/api.md#features)
  - [`RematchModel`](/docs/api.md#rematchmodel)
  - [`FlyingSaucerView`](/docs/api.md#flyingsaucerview)

&nbsp;

- [`history` bindings](/docs/api.md#enhanced-routing)
- [`context` bindings](/docs/api.md#context-bindings)
- [`redux` bindings](/docs/api.md#redux-bindings)

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

[re-exports](#simple-api) everything you need for creating and mounting a feature fleet.

```js
import { $$ } from '@@'
import Sidebar from '@/features/sidebar'
```

### dot files

`react-flying-saucer` respects any `.babelrc` and `.eslintrc` configuration files. Any additional configuration your project needs can be added directly to these files.

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
- [bundle-react-flying-saucer](packages/bundle-react-flying-saucer)
  - package a flying saucer app as NPM ready CJS and ESM!
- [create-react-flying-saucer](packages/create-react-flying-saucer)
  - create a create-react-app app and then codemod it to outerspace!
- [react-flying-saucer](packages/react-flying-saucer)
  - npm scripts for a react experience that's out of this world!
- [react-mothership](packages/react-mothership)
  - react primitives for building stellar apps!

## Typescript when?!

As soon as @rematch/rematch fixes its core typings.
