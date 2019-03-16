# bundle-react-flying-saucer

```sh
$ bundle-react-flying-saucer
```

Bundle a [react-flying-saucer](https://github.com/d3dc/react-flying-saucer) package with rollup for use anywhere - creates ESM and UMD bundles.

&nbsp;

UMD bundles created with this tool have a peer dependency on:

- react
- react-dom
- react-mothership

## Recommendations

Its recommended to expose the generated files in your `package.json` for bundlers to find

```js
  ...
  module: "dist/index.js"
  main: "dist/index.umd.js",
  scripts: {
    "prepare": "bundle-react-flying-saucer"
  },
  ...
```

## Use a tool

Task runners like [lerna](https://lernajs.io) are great for orchestrating multiple packages.
