![Dependencies](https://david-dm.org/ueno-llc/react-native-starter/status.svg) ![devDependencies](https://david-dm.org/ueno-llc/react-native-starter/dev-status.svg)

![Ueno](/docs/images/_ueno-loves-react.png)

# React Native Starter

The Professional React Native Starter with everything you'll ever need to deploy rock solid apps.

- Opinionated dependencies
- React Native Navigation 2
- TypeScript 3
- Cocoapods
- Gradle 4
- Unit and integration tests
- Continuous delivery support for Microsoft App Center

## Getting Started

Super-Quick Start

```bash
git clone -b master git@github.com:ueno-llc/react-native-starter.git my-app

# or for latest version
git clone git@github.com:ueno-llc/react-native-starter.git my-app

cd my-app
yarn
yarn rename "MyNewApp" com.ueno.mynewapp
yarn start
react-native run-(ios/android)
```

[Detailed guide here](https://ueno-llc.github.io/react-native-starter/#/INSTALLATION)

Alternatively you can use the `ueno-cli`:

```bash
npm install -g ueno-cli
ueno-cli react-native init "MyNewApp" --bundleId "com.ueno.mynewapp" --next
```

## Documentation

The **[Documentation is available here](https://ueno-llc.github.io/react-native-starter)** on GitHub Pages.

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

