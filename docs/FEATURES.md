# Features

React Native Starter is packed with a lot great features. These dependencies are shipped by default. They are strictly opinionated by Ueno and may change over time.

## Native modules

[react-native-navigation](https://github.com/wix/react-native-navigation) This library is the heart of the app. It provides excellent native navigation, while being easy to use. We are using the v2 which is still under developement, but we already use on several projects and we didn't noticed any reason to not using it.

[react-native-config](https://github.com/luggit/react-native-config) Handles all environment variables and passes them into the build for future use. We provided a little helper utility to hot reload your `.env` file. [Read more](/ENV.md)

[react-native-code-push](https://github.com/Microsoft/react-native-code-push) Distributing a react-native app without code-push is like uploading complete WordPress website via FTP. On a 56k connection. Every time you make a change. You can update your app remotely, all javascript changes, images and other bundled files, over-the-air. [Read more](/CODEPUSH.md)

[react-native-sentry](https://github.com/getsentry/react-native-sentry) Catching errors made easy. We add sentry from the start to make sure we catch any errors that may occour when Apple is reviewing the app for the first time. [Read more](/SENTRY.md)

[react-native-firebase](https://github.com/invertase/react-native-firebase) Everything you need to make an app. Database, analaytics, push notifications, etc. All in one place. Only downside is that it can get pretty heavy when using all the features. [Read more](/FIREBASE.md)

_____________

## Other modules

[typescript](https://www.typescriptlang.org/) We like Typescript. It takes a bit of time to get used to it, but it makes the app more solid, easier to read, it's very well embed with vscode for example, and it makes the build time faster.

[mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) We use mobx-state-tree to manage our state. It's awesome. It's the new version, it's more complicated, but it's awesome.

[lodash](https://lodash.com/) This is pretty much essential tool to manipulate arrays and objects.

[date-fns](https://date-fns.org/) We like date-fns better than momentjs because it is modular and lighter.
