# API

## Exported Utilities

- [`Mothership` to assemble your feature fleet](#mothership-)
- [`createApp` to configure create data sources for Mothership](#createappconfig)
- [`createFeature` to configure views, models, and ambient dependencies for a feature](#createfeatureconfig)
- [`createModel` to create encapsulated redux logic for a feature](#createModel)
- [`redux` bindings](#redux-bindings)
- [`context` bindings](#context-bindings)
- [enhanced routing](#enhanced-routing)

---

&nbsp;

### `<Mothership />`

Sets up the environment, optionally using the passed `app`.
Top-level features should be mounted as children of a `Mothership`.

**props:**

```
(Optional) app: FlyingSaucerApp
```

**example:**

```ts
<Mothership>
  <BrandChrome>
    <FeatureOne />
    <FeatureTwo path="/two" />
  </BrandChrome>
</Mothership>
```

&nbsp;

### `createApp(config)`

Create a new container for singletons used by [Mothership](#Mothership).

**arguments:**

```
config: {
  inject?: {},
  rematch?: RematchConfig,
}
```

**returns:**

`FlyingSaucerApp`

**example:**

```ts
createApp({ inject: { api } })
```

&nbsp;

### `createFeature(config)(Base)`

Decorate a React component at the root of a feature module. When mounted, it registers its dependencies with the context. Acts as a boundary for errors and suspense.

Features are declaratively composed inside a `Mothership`.

> Want lazy loading? Use a React.lazy component!

**arguments:**

```
config: {
  name: string, // optional display name
  placeholder: React.Element, // react element to show while suspended,
  recovery: React.Element, // react element to show when suspense fails
  provides: {}, // ambient dependencies
  models: [Rematch.Model], // rematch models to add to the store dynamically
  views: [{
    name: string
    path: string
    resolve?: (params: {}) => string // map params to formatted path
    component?: React.Component
    render?: (props: {}) => React.Component
    effect?: (dispatch: RematchDispatch) => any,
    redirect?: string | { to, ...params }
  }],
}
```

**returns**

`FeatureComponent`

**props**

```
(Optional) path: string
```

&nbsp;

### `createModel(modelConfig)`

Re-exports [Rematch's `createModel()`](https://rematch.gitbooks.io/rematch/docs/api.html#models).

Create a model to be used in the store. Models encapsulate state logic. Calling this is optional, as models are plain objects.

When first mounted, the model will be constructed, receiving the mothership's injectors as the final argument in any factory functions.

**arguments:**

```
modelConfig: {
  name: string, // optional display name
  reducers: { [actionName]: (state, payload) => state }
  selectors: (slice, createSelector, hasProps, inject) => { [selectorName]: models => (state, payload) => any }
  effects: (dispatch, inject) => { [actionName]: async (state, payload) => any }
}
```

**returns:**

`Rematch.Model`

**example:**

```ts
createModel(config: ModelConfig)
```

&nbsp;

## React Hooks

[React hooks are a proposed feature for a future version of React](https://reactjs.org/docs/hooks-intro.html). They're pretty neat.

`react-mothership` makes use of react hooks with [use-react-hooks](https://github.com/tannerlinsley/use-react-hooks). The apps `react-flying-saucer` templates use the stable React, but can still take advantage of hooks by importing them from `react-mothership`.

&nbsp;

### `useHooks(Base)`

HOC wrapper for functional components to use the proposed react hooks feature.

> You need this if you see a 🎣

**arguments:**

```
Base: Function
```

**example:**

```js
import { useHooks, useState, useEffect, useMemo, useReducer } from '@@'
```

```js
function Component() {
  const [name, setText] = useState('world')

  return <div>Hello, {name}!</div>
}

export default Component |> useHooks
```

&nbsp;

## Context Bindings

&nbsp;

### `useApp()` [🎣](#usehooksbase)

Hook to retrieve the mothership's app configuration.

**returns:**

`FlyingSaucerApp`

**example:**

```js
const app = useApp()
```

&nbsp;

### `useProvided(...paths)` [🎣](#usehooksbase)

Hook to retrieve the current scopes's ambient dependencies.

**arguments:**

```
paths: string[]
```

**returns:**

`any[]`

**throws:**

`NotProvidedInScopeError`

**example:**

```js
const [Layout, appName] = useProvided('Layout', 'config.app.name')
```

&nbsp;

## Redux Bindings

&nbsp;

### `sconnect(mapSelect, mapDispatch)(Base)`

**alias: `$$`**

`react-redux`'s `connect` function that retrieves the `Mothership`'s selectors instead of directly mapping state.

**arguments:**

```
mapSelect: RematchSelect => {}
mapDispatch: RematchDispatch => {}
```

**example:**

```js
const enhance = $$(
  select => ({
    todos: select.todos.list,
  }),
  dispatch => ({
    addTodo: dispatch.todos.addTodo,
  })
)
```

&nbsp;

### `withDispatch(mapDispatch)(Base)`

**alias: `_$`**

`connect`s only dispatchers. `$$` but skips the first argument.

**arguments:**

```
mapDispatch: RematchDispatch => {}
```

**example:**

```js
const enhance = _$(dispatch => ({
  addTodo: dispatch.todos.addTodo,
}))
```

&nbsp;

### `useAppEffect(effectWithDispatch, watch)` [🎣](#usehooksbase)

Hook to run dispatchers as a side-effect when any value in watch changes.

**arguments:**

```
effectWithDispatch: RematchDispatch => any
watch: any[]
```

**example:**

```js
useAppEffect(dispatch => dispatch.storage.retrieve(props.id), [props.id])
```

&nbsp;

## Enhanced Routing

every routing primitive from `react-router` is available from `react-mothership`. Any components that take a `to` prop can also resolve it from the current scope's `views`.

**example:**

```js
import { Switch, Route, Redirect, Link, NavLink } from '@@'
```

```js
function Nope({ match }) {
  return <Redirect view="nope" params={match} />
}
```

**props:**

```
view: string
params: any
```

**todo:**

You may notice we export components from `react-router-dom`; this might be revisited to use some form of DI
