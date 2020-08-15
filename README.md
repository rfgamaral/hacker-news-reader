# Hacker News Reader

A basic Hacker News reader application for exceptionally impatient users.

## Instructions

### Project Dependencies

Before launching the development server or building a production distribution for deployment, project dependencies must first be installed:

```sh
# npm
npm install

# Yarn
yarn install
```

### Development Server

To run the development server with hot module reloading but without offline capabilities:

```sh
# npm
npm start

# Yarn
yarn start
```

Open your favorite browser and go to [`https://localhost.ricardoamaral.dev:1234`](https://localhost.ricardoamaral.dev:1234).

#### API Workaround

The [Hacker News API](https://github.com/HackerNews/API) is only served over HTTPS, and requests from an insecure HTTP origin (e.g., local development server) are blocked. To overcome this limitation I've configured the `localhost.ricardoamaral.dev` address to point to `127.0.0.1` with a certificate (valid for 90 days) from [Let's Encrypt](https://letsencrypt.org/).

### Tests

To run all unit tests and output a coverage report:

```sh
# npm
npm test

# Yarn
yarn test
```

### Production Build

To build a distribution ready for production with minified assets, hashed resources, and a service worker with offline capabilities:

```sh
# npm
npm run build

# Yarn
yarn build
```

## Live Demo

A live demo with offline capabilities was deployed to [Vercel](https://vercel.com/) and is available at:

- https://hacker-news-reader.ricardoamaral.dev

## Technology

This application was built on core technologies such as [React](https://reactjs.org/) - a JavaScript library for building user interfaces - and [TypeScript](https://www.typescriptlang.org/) - a typed superset of JavaScript that compiles to plain JavaScript. More tools and libraries were used during development, including, but not limited to:

- [Parcel](): Blazing fast, zero-configuration web application bundler
- [Tailwind CSS](): A utility-first CSS framework for rapidly building custom designs
- [Testing Library](): Simple and complete testing utilities that encourage good testing practices
- [Workbox](): JavaScript Libraries for adding offline support to web apps

## License

The use of this source code is governed by an MIT-style license that can be found in the [LICENSE](LICENSE) file.
