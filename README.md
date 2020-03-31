# Morselo-client

[![Netlify Status](https://api.netlify.com/api/v1/badges/a0be5d26-c1ee-4fe1-8e51-2408a79c525c/deploy-status)](https://app.netlify.com/sites/morselo/deploys)

> Morselo - the daily code excerpts for the developers. Collect & organize code, snippets and notes. Manage and share your snippets with ease.

## Project setup

For local development, change the `VUE_APP_ROOT_API` value to your local server's Base Url from where you will serve the graphql endpoint.

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Roadmap for version 1.0.0

Morselo is still under heavy development, We decided to ship it in this early stage so you can help us make it better.

Here's the plan for what's coming:

- [x] Social login via **Github**
- [x] Feeds of latest snippet
- [x] Lists all tags (categories) in categories page
- [x] Tag wise feed listing
- [x] Admin - create snippet
- [x] Admin - edit snippet
- [x] Dev can like, bookmark snippets if logged in
- [x] List bookmarks and dev's snippets
- [ ] Unit Test
- [ ] Public search page using algolia
- [ ] Social login via **Twitter**
- [ ] Use vue-apollo `fragments`
- [ ] On toggling a bookmark, update bookmarks cache
- [ ] On creating new snippet, update snippets cache

## Roadmap for version 2.0.0

- [ ] snippets can be make public and private
- [ ] private snippets will not come in public search or feeds
- [ ] follower and following concept
- [ ] allow devs to store snippets as gists in github (exceptions to be handled when login using twitter)
- [ ] fully responsive ui for mobile
- [ ] many more to come...

## Credits

- [Abhishek Sarmah](https://github.com/abhisheksarmah)
- [Mithicher Baro](https://github.com/mithicher)

## Contributing

coming soon...

## License

Morselo is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
