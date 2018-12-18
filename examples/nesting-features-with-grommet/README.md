# Nesting Features With Grommet

This example uses a UI kit, Grommet, to assemble the shell of a basic application. Features are mounted inside the `App` component that renders the `Mothership`.

Features that are siblings or descendants in a `Mothership` can share dependencies - As this example demonstrates, an "Accounts" feature is used most places in an application.

Grommet, the UI kit, has a main wrapper component to bootstrap its context. This example wraps its features in `Main`. Since every feature will descend from `Main`, is a good place to provide any layout components that might not be fixed at compile time - like page primitives, modals, and responsive elements.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
