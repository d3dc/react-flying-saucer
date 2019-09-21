# `craco-flying-saucer`

Configure [@craco/core](//github.com/sharegate/craco) to prepare for launch with [react-flying-saucer](https://github.com/d3dc/react-flying-saucer)

## Usage

1.

```
$ npx @craco/core --config node_modules/craco-flying-saucer
```

2.

```
require('craco-flying-saucer/bootstrap')(() => {
    // Use craco with the virtual config applied.
    require('@craco/core/...')
})
```

3.

Or extend the config yourself, it's a static object!
