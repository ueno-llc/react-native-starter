# Features

The starter kit is shipped with a couple of native modules that we feel is essential when publishing an app.


### Native modules

 - [react-native-navigation](#react-native-navigation)
 - [react-native-config](#react-native-config)
 - react-native-blur
 - [code-push](#code-push)
 - [sentry](#sentry)
 - [firebase](#firebase)

## Other modules

 - [mobx](#mobx)
 - mobx-react
 - mobx-persist
 - [lodash](#lodash)
 - [core-decorators](#core-decorators)
 - [date-fns](#date-fns)
 - [react-native-ui-lib](#react-native-ui-lib)

### react-native-navigation

This library is the heart of the app. It provides excellent native navigation, while being easy to use.

### react-native-config

Handles all environment variables and passes them into the build for future use. We provided a little helper utility to hot reload your `.env` file. [Read more](/ENV.md)

### code-push

Distributing an react-native app without code-push is like uploading complete WordPress website via FTP. On a 56k connection. Every time you make a change.

You can update your app remotely, all javascript changes, images and other bundled files, over-the-air.

### sentry

Catching errors made easy.

We add sentry from the start to make sure we catch any errors that may occour when Apple is reviewing the app for the first time.

### firebase

Everything you need to make an app. Database, analaytics, push notifications, etc. All in one place.

Only downside is that it can get pretty heavy when using all the features.

### mobx

We use mobx to manage our state. Its awesome.

### lodash

This is pretty much essential tool to manipulate arrays and objects.

### date-fns

We like date-fns better than momentjs because it is modular.

### core-decorators

Mostly for autobind, but also for other things like create our own decorators.

### react-native-ui-lib

Wix doing an awesome job of scaffolding great way to deal with UI components. We are currently experimenting with the library and decided to include it in the build.
