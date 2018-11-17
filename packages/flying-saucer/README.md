# flying-saucer

The main package. Takes the place of `react-scripts` as well as exporting opinionated boilerplate.

_Note_: exports are written in `techno-babel` and expect to be compiled by `flying-saucer`

## npm scripts

- start
- test
- build

## Exported Utilities

- [`createApp` to keep singletons around](#createApp)
- [`createModel` to create encapsulated redux logic](#createModel)
- [`createModule` to declaratively configure routes and models for a feature](#createModule)
- [`Mothership` to hold your flying saucer](#Mothership)
- [`Link` and `NavLink` that can create anchors to named routes](#Link)
- `{ connect }` from [react-redux] (WIP: [react-rematch])
- `{ Switch, Route }` from [react-router]

## "src/" alias

You can always link to the root of your project with the `@` alias. This is useful for linking between modules.

```js
import Sidebar from '@/modules/sidebar'
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

### `createModule`

Decorate a React component at the root of a feature module. When mounted, it registers its dependencies with the context. Acts as a boundary for errors and suspense.

Modules should be mounted inside a `Mothership`.

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

Sets up the environment for the passed `app`.

Modules from `createModule` should be mounted as children of a `Mothership` - e.g. by routing or directly.

```ts
<Mothership app={app}>
  <MyModule />
</Mothership>
```

## dot files

Because babel resolves `.babelrc` from the file being compiled, it'll need to exist in the root of your project to properly work for both `create-react-app` and `jest`.

The same applies to `.eslintrc`

Any additional configuration your project needs can be added these files as well.
