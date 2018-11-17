## Provides

- `createApp` to keep singletons around
- `app.createModule` to declaratively configure routes and models for a feature
- `app.createModel` to create encapsulated redux logic
- `app.createStore` to bootstrap the redux store
- `{ Provide, connect }` from [react-redux] (WIP: [react-rematch])
- `{ Link, NavLink, Switch, Route }` from [react-router]

## API

### `createApp`

Create a new container for singletons and include any extras.
Bootstraps the rematch store with:

- [@rematch/select]()

```js
  createApp(name: string, extras: {})
```

### `app.createModule`

Decorate a React component that should receive pre-configured routing as children

```js
createModule({
  routes: [{ // props used to create individual routes for the module
    name: string,
    path: string,
    view: (...args) => string, // view function to be registered on app
    component: React.Component,
    loader: () => Promise<React.Component>
  }],
  models: [Rematch.Model], // rematch models to add to the store immediately
  placeholder: React.Element, // react element to show while suspended,
  recovery: React.Element, // react element to show when suspense fails
})(component: React.Component)
```

### `app.createModel`

Create a rematch model with any extra singletons your app uses

```js
createModel(Rematch.Model || (extras => Rematch.Model))
```

## dot files

Because babel resolves `.babelrc` from the file being compiled, it'll need to exist in the root of your project to properly work for both `create-react-app` and `jest`.

The same applies to `.eslintrc`

```js
// .babelrc
{
  extends: 'flying-saucer/babel-preset',
}
```

```js
// .eslintrc
{
  extends: 'flying-saucer/eslint-config',
}
```

Any additional configuration your project needs can be added these files as well.
