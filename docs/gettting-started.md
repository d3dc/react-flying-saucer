# Getting Started

intro

## Function Components

hooks are a proposed change to React

~~Using React 16.6, needs `useHooks` as a "polyfill"~~

## Models

features will register their models with any app they are mounted in. models registered after actions have arrived will receive a replay.

## Providers

features create a new scope in the context. they can provide an object to add to or overwrite any providers from enclosing scopes.

Mothership starts with routing components already provided.

## Declarative Routing

explain [react-router](https://github.com/ReactTraining/react-router)

components are the "source" of events.

```js
function Hello({ done }) {
  const { Redirect } = useProvided()

  if (done) {
    return <Redirect view="Goodbye" />
  }

  return 'Hello'
}
```
