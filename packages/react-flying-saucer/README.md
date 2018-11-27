# react-flying-saucer

An all-in-one react app toolkit. Provides customized [react-scripts](https://github.com/facebook/create-react-app#readme) as well as abstractions and HOCs for truly modular react applications.

_Note_: lib uses es6+ features and needs to be compiled

## npm scripts

- start
- test
- build

## Exported Utilities

- [`Mothership` to assemble your feature fleet](#Mothership)
- [`createApp` create data sources for Mothership](#createApp)
- [`createFeature` to declaratively configure views, models, and ambient dependencies for a feature](#createModule)
- [`createModel` to create encapsulated redux logic for a feature](#createModel)
- [`redux` bindings](#redux-bindings)
- [`useApp`](#useApp)
- [`useProvided`](#useProvided)
- `{ Switch, Route }` from [react-router]

## Import Aliases

Special imports from the toolkit all come from `react-flying-saucer` - which is given the `@@` alias.

You can always link to the source root of your project with the `@` alias. This is useful for linking to features.

```js
import Sidebar from '@/features/sidebar'
```

## API

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
    <FeatureTwo />
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

### `createFeature(config)`

Decorate a React component at the root of a feature module. When mounted, it registers its dependencies with the context. Acts as a boundary for errors and suspense.

Features are declaratively composed inside a `Mothership`.

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
    view?: (params: {}) => string // map params to formatted path
    component?: React.Component
    loader?: () => Promise<React.Component>
    render?: (props: {}) => React.Component
  }],
}
```

### `createModel`

Create a model to be used in the store. Models encapsulate state logic.

Re-exports [Rematch's `createModel()`](https://rematch.gitbooks.io/rematch/docs/api.html#models) with all factories receiving the mothership's injectors

**returns:**

`Rematch.Model`

**example:**

```ts
createModel(config: ModelConfig)
```

### `useHooks()`

HOC for functions that use future react hooks.
**You must wrap your functions to use hooks**

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
const { NavLink } = useProvided()
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

### `withReduxEffect(mapDispatch)`

**alias: `_$`**

`connect`s only dispatchers. `$$` but skips the first argument.

**example:**

```js
const enhance = _$(dispatch => ({
  addTodo: dispatch.todos.addTodo,
}))
```

### `useReduxEffect(mapDispatch, watch)`

Hook to run dispatchers as a side-effect.

**example:**

```js
useReduxEffect(dispatch => dispatch.storage.retrieve(props.id), [props.id])
```

## dot files

`react-flying-saucer` respects any `.babelrc` and `.eslintrc` configuration files. Any additional configuration your project needs can be added directly to these files.
