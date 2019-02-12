# react-flying-saucer

[Runtime toolkit for react-flying-saucer.](https://github.com/d3dc/react-flying-saucer)

Provides customized [react-scripts](https://github.com/facebook/create-react-app#readme)

## tasks

`react-flying-saucer` works the same way as `react-scripts` from `create-react-app`. You can pass the following task names as arguments:

- start
- test
- build
- bundle

## bundling

`react-flying-saucer` lets you include bundled features and their dependencies from separate packages by first calling `react-flying-saucer bundle` in the feature package - task runners like [lerna](https://lernajs.io) are great for orchestrating multiple packages.
