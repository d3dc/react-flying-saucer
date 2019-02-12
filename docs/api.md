# API

- [The App - Every app has a Mothership](#the-app)
- [Features - Your fleet of features flies in formation](#features)
- [`RematchModel` - encapsulates redux logic for a feature](#rematchmodel)
- [`FlyingSaucerView` - encapsulates how a feature responds to the Mothership's history](#flyingsaucerview)
- [enhanced routing - go where you want to go](#enhanced-routing)
- [`context` bindings](#context-bindings)
- [`redux` bindings](#redux-bindings)

---

&nbsp;

## The App

Every application starts with a `Mothership` at the root to control its fleet.

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

  (Optional) inject: {}

  (Optional) rematch?: RematchConfig

}
```

**returns:**

`FlyingSaucerApp`

**example:**

```ts
createApp({ inject: { api } })
```

&nbsp;

## Features

`react-mothership` is based around feature modules. The tree created by the react components at the root of your application describes the active features and how they are wired together - or in better words, what formation your fleet is flying in.

&nbsp;

### `createFeature(config)(Base)`

Decorate a React component at the root of a feature module. When mounted, it registers its dependencies with the context. Acts as a boundary for errors and suspense.

> Want lazy loading? Use a React.lazy component!

**arguments:**

```
(Optional) config: {

  (Optional) name: string, // display name

  (Optional) placeholder: React.Element, // react element to show while suspended,

  (Optional) recovery: React.Element, // react element to show when suspense fails

  (Optional) models: [Rematch.Model], // rematch models to add to the store dynamically

  (Optional) views: [FlyingSaucerView], // views to provide in the parent scope

  (Optional) provides: {}, // concrete ambient dependencies

}
```

**returns**

`FeatureComponent`

**example:**

```js
import Base from './Base'
import views from './views'
import models from './models'

const package = createFeature({
  views,
  models,
})

export default Base |> package
```

&nbsp;

### `<FeatureComponent />`

Behaves almost like a feature flag; mount this inside your mothership.

**props:**

```
(Optional) path: string
```

**example:**

```js
import Feature from '@/features/Feature'
```

```js
<Mothership>
  <Feature path="/somewhere" />
</Mothership>
```

&nbsp;

### `RematchModel`

Models encapsulate state logic.

When first mounted, a model will be registered with the store and built. Each of its factory functions will receive the `inject` property of the current `Mothership`.

**props:**

```
{

  name: string, // name to register globally

  (Optional) reducers: {
    [actionName]: (state, payload) => state
  }

  (Optional) selectors: (slice, createSelector, hasProps, inject) => {
    [selectorName]: models => (state, payload) => any
  }

  (Optional) effects: (dispatch, inject) => {
    [actionName]: async (state, payload) => any
  }

}
```

&nbsp;

### `FlyingSaucerView`

Views are declarative _responses_ to `app.history` changes.

Each view will become a `<Route />` in a `<Switch />`

- `component` can be a `React.lazy` component and always takes precedence
- `render`, `effect`, and `redirect` can be combined for a _side-effect in response to routing_.

**props:**

```
{

  name: string

  path: string

  (Optional) resolve: (params: {}) => string // map params to formatted path

  (Optional) component: React.Component

  (Optional) render: (props: {}) => React.Component

  (Optional) effect: (dispatch: RematchDispatch) => any,

  (Optional) redirect: string | { to, ...params }

}
```

&nbsp;

## Enhanced Routing

Every routing primitive from `react-router` is available from `react-mothership`. Any components that take a `to` prop can also resolve it from the current scope's `views`.

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

&nbsp;

## Context Bindings

&nbsp;

### `useApp()`

Hook to retrieve the mothership's app configuration.

**returns:**

`FlyingSaucerApp`

**example:**

```js
const app = useApp()
```

&nbsp;

### `useProvided(...paths)`

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

### `useAppEffect(effectWithDispatch, watch)`

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
