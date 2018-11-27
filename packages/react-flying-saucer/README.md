# react-flying-saucer

An all-in-one react app toolkit. Provides customized [react-scripts](https://github.com/facebook/create-react-app#readme) as well as abstractions and HOCs for truly modular react applications.

_Note_: lib uses es6+ features and needs to be compiled

## npm scripts

- start
- test
- build

## Exported Utilities

- [`createApp` to keep singletons around](#createApp)
- [`createModel` to create encapsulated redux logic](#createModel)
- [`createFeature` to declaratively configure views and models for a feature](#createModule)
- [`Mothership` to assemble your feature fleet](#Mothership)
- [`Link` and `NavLink` that can create anchors to named routes](#Link)
- `{ connect }` from [react-redux] (WIP: [react-rematch])
- `{ Switch, Route }` from [react-router]

## Import Aliases

You can always link to the source root of your project with the `@` alias. This is useful for linking to features.

```js
import Sidebar from '@/features/sidebar'
```

## API

### `createApp`

Create a new container for singletons.

Bootstraps the rematch store with:

- [@rematch/select]()

```ts
createApp({
  inject?: {},
  rematch?: RematchConfig,
}): FlyingSaucerApp
```

```ts
interface FlyingSaucerApp {
  store: RematchStore
  routing: { [view: string]: (params: {}) => path }
  inject: {}
}
```

### `createModel`

Create a model to be used in the store. Models encapsulate state logic.

> Models automatically receive `inject` as the final argument in their Rematch factories.

Re-exports [Rematch's `createModel()`](https://rematch.gitbooks.io/rematch/docs/api.html#models)

```ts
createModel(config: ModelConfig): Model
```

### `createFeature`

Decorate a React component at the root of a feature module. When mounted, it registers its dependencies with the context. Acts as a boundary for errors and suspense.

Features are declaratively composed inside a `Mothership`.

```ts
createModule({
  routes: [RouteConfig],
  models: [Rematch.Model], // rematch models to add to the store immediately
  placeholder: React.Element, // react element to show while suspended,
  recovery: React.Element, // react element to show when suspense fails
})(component: React.Component): React.Component
```

```ts
interface RouteConfig {
  name: string
  path: string
  view?: (params: {}) => string // map params to formatted path
  component?: React.Component
  loader?: () => Promise<React.Component>
  render?: (props: {}) => React.Component
}
```

### `Mothership`

Sets up the environment, optionally using the passed `app`.

Features should be mounted as children of a `Mothership`.

```ts
<Mothership>
  <BrandChrome>
    <FeatureOne />
    <FeatureTwo />
  </BrandChrome>
</Mothership>
```

## dot files

`react-flying-saucer` respects any `.babelrc` and `.eslintrc` configuration files. Any additional configuration your project needs can be added directly to these files.
