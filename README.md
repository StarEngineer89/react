# ByeBuy Checkout 2.0

## Environment Setup

Install node.js then clone repository and run npm install. Currently we have 2 commands.

npm run build - runs Webpack in production mode, which minimizes the bundle file automatically
npm run dev - runs the Webpack in the watch mode

## Production build

1. npm should be installed

2. install npm packages

3. build static files

```sh
$ npm install
$ npm run build
```

## Production server

Use one of provided cases 

a. serve files from src/dist/*. For now only checkout dir and index.html is used 
 
b. run node js server

```sh
$ npm run server
```
 
## Fake phone button

By default phone verification is ON. If you don't want spent time and money for it you can start using Fake Button.
When you click on it - we automatically set phone number as verified. It works on any ENV, even on production.

Activation is easy. Open browsers dev toolbar and execute following line in console.

```js
localStorage.setItem('fakeButton', 'true')
```

Deactivation: remove localStorage data for the site.
