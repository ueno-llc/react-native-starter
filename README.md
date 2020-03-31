[![logo](https://user-images.githubusercontent.com/937328/50185086-cb7e7a80-030e-11e9-8d95-436082e38de6.png)](https://ueno.co/?utm_source=github&utm_campaign=react-native-starter)
<br /><br />
![banner](https://user-images.githubusercontent.com/937328/50185090-cb7e7a80-030e-11e9-9077-8fcc4e5ac900.png)
<br /><br />
[![about](https://user-images.githubusercontent.com/937328/51540139-999c8e80-1e4d-11e9-866d-284657a34744.png)](https://ueno.co/contact/?utm_source=github&utm_campaign=react-native-starter)
<br /><br />

## React Native Starter

![Dependencies](https://david-dm.org/ueno-llc/react-native-starter/status.svg) ![devDependencies](https://david-dm.org/ueno-llc/react-native-starter/dev-status.svg)

The Professional React Native Starter with everything you'll ever need to deploy rock solid apps.

- Opinionated dependencies
- React Native Navigation 4
- TypeScript 3.7
- Auto Linking
- Gradle 5
- Unit and integration tests
- Continuous delivery support for Microsoft App Center

## Getting Started

Super-Quick Start

```bash
git clone git@github.com:ueno-llc/react-native-starter.git my-new-app
```

```bash
cd my-new-app
yarn
yarn rename "MyNewApp" com.ueno.mynewapp
yarn start
yarn ios # or yarn android
```

Alternatively you can use [`create-ueno-app`](https://github.com/ueno-llc/create-ueno-app#native):

```bash
yarn create ueno-app native my-new-app co.ueno.mynewapp
```

## Running automated tests

### iOS

```
yarn build:e2e:ios
yarn test:e2e:ios
```

Note: To see the testing in-action, open the iPhone X Simulator manually before running the tests.

### Android

```
yarn build:e2e:android
yarn test:e2e:android
```

Note: You will need to create Emulator with the name `Pixel_2_API_28` in Android Studio.

## Documentation

The **[documentation is available here](https://ueno-llc.github.io/react-native-starter)** on GitHub Pages.

We also recommend the following reading material:

- [React Native](https://facebook.github.io/react-native/)
- [React Native Navigation](https://wix.github.io/react-native-navigation/)
- [React Native Config](https://github.com/luggit/react-native-config)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [Android Developer Guide](https://developer.android.com/guide/index.html)

## Upgrading

No plans have been made so far to upgrade. We only support merging from upstream for now.

## Contributing

If you are interested in helping out, feel free to submit issues, pull-requests or even [contact us](mailto:birkir@ueno.co). We are open to all kind of contributions.

## License

This project is [MIT licensed](/LICENSE.md)
