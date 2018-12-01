# react-flying-saucer

> The aliens aren't in the bikeshed.

A zero-config way to write functional react apps that scale.

**features:**

- All the batteries are included
- Compose feature modules as declarative React components
- Modules declare context-based providers for injecting (and overloading) routing and other common components
- opinionated syntax from [babel-preset-techno-babel](https://github.com/d3dc/babel-preset-techno-babel)
- dispatch changes through redux to encapsulated [rematch models](https://rematch.gitbooks.io/rematch/docs/api.html#models)
- memoize updating from your redux state using [rematch selectors](https://rematch.gitbooks.io/rematch/plugins/select/)

## Packages

- [create-react-flying-saucer](packages/create-react-flying-saucer)
  - Create a create-react-app app and then codemod it to outerspace!
- [react-flying-saucer](packages/react-flying-saucer)
  - npm scripts and runtime dependencies for a functional react that's out of this world!
