<div align="center" style="display:flex;flex-direction:column;">
  <a href="https://griffonnage.now.sh">
    <img
      src="https://raw.githubusercontent.com/griffonnage/griffonnage-branding/master/svg/banner.svg"
      alt="Griffonnage: Scribble careless drawings with friends, privately"
    />
  </a>
</div>

[![GitHub Tag](https://img.shields.io/github/tag/griffonnage/griffonnage.svg)](https://github.com/griffonnage/griffonnage/releases/latest)
[![GitHub Action CI/CD](https://github.com/griffonnage/griffonnage/workflows/CI/CD/badge.svg)](https://github.com/griffonnage/griffonnage/actions?query=workflow%3A%22CI%2FCD%22)
[![Coverage Status](https://img.shields.io/codecov/c/github/griffonnage/griffonnage)](https://codecov.io/gh/griffonnage/griffonnage)
[![License](https://img.shields.io/github/license/griffonnage/griffonnage)](https://github.com/griffonnage/griffonnage/blob/master/LICENSE)

Griffonnage allows truly private synchronized drawings with friends.
All the drawings and chat messages are sent end-to-end encrypted in a
peer-to-peer fashion, meaning no server whatsoever does not retain nor
can see your data in transit.

The only shame you'll get from drawing the most obscene stuff ever
will be between you and your friends only. 😏

Built using the following open-source projects:

- [Nuxt.js](https://nuxtjs.org)
- [Fabric.js](http://fabricjs.com/)
- [Socket-io](https://socket.io)
- [TweetNaCl.js](https://tweetnacl.js.org)
- [Bulma](https://bulma.io)
- [FontAwesome](https://fontawesome.com)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Inspiration

This project has been greatly inspired by:

- [Excalidraw](https://excalidraw.com): end-to-end encrypted drawings
- [Skribbl](https://skribbl.io): drawing with friends to guess words (within an ocean of advertisements)
- The COVID-19 home confinement

## License

Licensed under GNU Affero General Public License v3.0 (AGPLv3)

Copyright (c) 2020 - present Romain Clement
