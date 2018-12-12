# API

## Exported Utilities

- [`Mothership` to assemble your feature fleet](#mothership-)
- [`createApp` to configure create data sources for Mothership](#createappconfig)
- [`createFeature` to configure views, models, and ambient dependencies for a feature](#createfeatureconfig)
- [`createModel` to create encapsulated redux logic for a feature](#createModel)
- [`redux` bindings](#redux-bindings)
- [`context` bindings](#context-bindings)

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
  models: [Rematch.Model], // rematch models to add to the store immediately
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

### `createModel`

Re-exports [Rematch's `createModel()`](https://rematch.gitbooks.io/rematch/docs/api.html#models).

Create a model to be used in the store. Models encapsulate state logic. Calling this is optional, as models are plain objects.

When first mounted, the model will be constructed, receiving the mothership's injectors as the final argument in any factory functions.

**arguments:**

```
config: {
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

## Context Bindings

### `useHooks()`

[HOC to polyfill functions to use future react hooks.](https://github.com/tannerlinsley/use-react-hooks)

**`react-flying-saucer` creates apps that depend on React 16.6**

### `useApp()`

Hook to retrieve the mothership's app configuration.

**returns:**

`FlyingSaucerApp`

**example:**

```js
const app = useApp()
```

### `useProvided`

Hook to retrieve the current scopes's ambient dependencies.
By default `Mothership` provides `react-router` analogs that `useApp()`.

**returns:**

`{ [dependencyName]: dependencyValue }`

**example:**

```js
const { Link, NavLink, Redirect, Route, Switch } = useProvided()
```

## Redux Bindings

### `sconnect(mapSelect, mapDispatch)`

**alias: `$$`**

`react-redux`'s `connect` function that retrieves the `Mothership`'s selectors.

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

### `withDispatch(mapDispatch)`

**alias: `_$`**

`connect`s only dispatchers. `$$` but skips the first argument.

**example:**

```js
const enhance = _$(dispatch => ({
  addTodo: dispatch.todos.addTodo,
}))
```

### `useAppEffect(effectWithDispatch, watch)`

Hook to run dispatchers as a side-effect when any value in watch changes.

**example:**

```js
useAppEffect(dispatch => dispatch.storage.retrieve(props.id), [props.id])
```
