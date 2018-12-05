# react-flying-saucer

[Runtime toolkit for react-flying-saucer.](https://github.com/d3dc/react-flying-saucer)

Provides customized [react-scripts](https://github.com/facebook/create-react-app#readme) as well as abstractions and HOCs for truly modular react applications.

_Note_: lib uses es6+ features and needs to be compiled

## tasks

`react-flying-saucer` works the same way as `react-scripts` from `create-react-app`. You can pass the following task names as arguments:

- start
- test
- build

## Exported Utilities

- [`Mothership` to assemble your feature fleet](docs/api.md#mothership-)
- [`createApp` to declare data sources for the Mothership](docs/api.md#createappconfig)
- [`createFeature` to declare views, models, and ambient dependencies for a feature](docs/api.md#createfeatureconfig)
- [`createModel` to create encapsulated redux logic for a feature](docs/api.md#createModel)
- [`redux` bindings](docs/api.md#redux-bindings)
- [`context` bindings](docs/api.md#context-bindings)
