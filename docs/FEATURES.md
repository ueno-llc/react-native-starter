# Features

ReactNativeStarterKit is packed with great features:

## Dependencies

These dependencies are shipped by default. They are strictly opinionated by Ueno and may change over time.

### Native modules

 - [react-native-navigation](#react-native-navigation)
 - [react-native-config](#react-native-config)
 - [react-native-code-push](#code-push)
 - [react-native-sentry](#sentry)
 - [react-native-firebase](#firebase)

## Other modules

 - [typescript](#typescript)
 - [mobx](#mobx)
 - [mobx-react](#mobx)
 - [mobx-state-tree](#mobx)
 - [lodash](#lodash)
 - [date-fns](#date-fns)

_____________

## Native modules

### react-native-navigation

This library is the heart of the app. It provides excellent native navigation, while being easy to use.

### react-native-config

Handles all environment variables and passes them into the build for future use. We provided a little helper utility to hot reload your `.env` file. [Read more](/ENV.md)

### react-native-code-push

Distributing an react-native app without code-push is like uploading complete WordPress website via FTP. On a 56k connection. Every time you make a change.

You can update your app remotely, all javascript changes, images and other bundled files, over-the-air.

### react-native-sentry

Catching errors made easy.

We add sentry from the start to make sure we catch any errors that may occour when Apple is reviewing the app for the first time.

### react-native-firebase

Everything you need to make an app. Database, analaytics, push notifications, etc. All in one place.

Only downside is that it can get pretty heavy when using all the features.

_____________

## Other modules

### typescript

TODO

### mobx

We use mobx to manage our state. Its awesome.

### mobx-state-tree

We use mobx to manage our state. Its awesome.

### lodash

This is pretty much essential tool to manipulate arrays and objects.

### date-fns

We like date-fns better than momentjs because it is modular.
