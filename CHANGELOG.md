# Changelog

All notable changes to this project will be documented in this file.

## 3.0.0 - 2019-09-01

React Native 0.61 with _Fast Reload_

- devDependencies now have caret versioning
- Replace bundle root from `index.js` to `src/index.ts`.
- macOS checks in postinstall scripts
- Hermes support (disabled for now because of mobx 5 Proxy requirement)
- styled-components
- removed css files support
- VSCode autosave config
- Auto linking for iOS (Podfile) and Android (gradle)
- Gradle 5.xx
- RNN 3 (react-native-navigation)

### Added

- `styled-components`
- `polished`

### Changed

- `@react-native-community/async-storage` to `1.6.1`
- `jsc-android` to `241213.1.0`
- `lodash` to `4.17.15`
- `mobx` to `5.13.0`
- `mobx-devtools-mst` to `0.9.21`
- `mobx-react` to `6.1.3`
- `mobx-state-tree` to `3.14.1`
- `react` to `16.9.0`
- `react-native` to `0.61.0-rc.0`
- `react-native-code-push` to `5.6.1`
- `react-native-config` to `0.11.7`
- `react-native-firebase` to `5.5.6`
- `react-native-navigation` to `3.0.0`
- `react-native-sentry` to `0.43.2`

### Removed

- `react-native-ueno-css-modules`
- `node-sass`

## 2.2.0 - 2019-03-08

React Native 0.59 with _Hooks_

- Removed root resolver to embrace TypeScript
- Build env on Android
- Prettier for the community
- No require()'s

### Added

- @react-native-community/async-storage
- prettier

### Changed

- Bump `jsc-android` to `241213.0.0`
- Bump `mobx` to `5.9.0`
- Bump `mobx-state-tree` to `3.10.2`
- Bump `react` to `16.8.3`
- Bump `react-native` to `0.59.0-rc.3`
- Bump `react-native-code-push` to `5.5.2`
- Bump `react-native-firebase` to `5.2.3`
- Bump `react-native-navigation` to `2.13.1`
- Bump `react-native-sentry` to `0.42.0`
- Bump `react-native-ueno-modules` to `1.1.0`
- Bumped all `@types` to latest
- Bump `detox` to `10.0.12`
- Bump `jest` and `babel-jest` to `24.3.1`

### Removed

- date-fns
- core-decorators
- tslib
- schedule
- babel-plugin-module-resolver
- @firebase/app-types

## 2.1.0 - 2019-01-14

### Added

- Add default support for `SCSS`
- Add stylelint for `SCSS`
- Script to create podspec file for library without it `yarn podspec`
- Add `@ueno/tslint-config` to the repository

**Android sepcific**

- Add `google()` as default provider

### Changed

- Bump `react-native` to `0.57.8`
- Bump `react` to `16.7.0`
- Bump `react-native-firebase` to `5.2.0`
- Bump `react-native-navigation` to `2.5.2`
- More documented documentation
- Fix `appcenter-pre-build` script
- No more default export

**Android specific**

- Bump `android-jsc` to `r236355`
- Bump to `com.google.android.gms:play-services-base:16.0.1`
- Bump to `com.google.gms:google-services:4.0.1`

### Removed

- Some unused packages

## 2.0.0 - 2018-07-18

WIP - New api

## 1.0.2 - 2018-02-24

Big release.

- TypeScript Support
- Fix travis builds for pull requests
- Fix symroot bug in build-env
- Refactored fastlane functions
- Ignore set of default YellowBox warnings

## iOS

- Better TestFlight detection
- iOS Simulator detection
- Fix Code Push key in Info.plist

### Updated dependencies

- react-native: 0.53.0 → **0.53.3**
- react-native-firebase: 3.2.4 → **3.2.6**
- react-native-navigation: 1.1.374 → **1.1.386**
- react-native-sentry: 0.33.0 → **0.34.0**
- react-native-ui-lib: 3.2.14 → **3.2.21**

## Updated devDependencies

- mobx-react: 4.4.1 → **4.4.2**
- babel-eslint: 8.2.1 → **8.2.2**
- babel-jest: 22.2.0 → **22.4.1**
- babel-plugin-module-resolver: 3.0.0 → **3.1.0**
- detox: 7.0.1 → **7.1.0**
- eslint: 4.17.0 → **4.18.1**
- eslint-plugin-import: 2.8.0 → **2.9.0**
- eslint-plugin-jest: 21.7.0 → **21.12.2**
- eslint-plugin-react: 7.6.1 → **7.7.0**
- jest: 22.2.1 → **22.4.2**
- lint-staged: 6.1.0 → **7.0.0**
- mocha: 5.0.0 → **5.0.1**
- patch-package: 5.0.0 → **5.1.1**

## 1.0.1 - 2018-02-10

- Now using patch-package to modify npm packages automatically.
- Docsify for automatic gh-pages generation

### Added

- react-native-ui-lib
- react-native-blur
- react-native-interactable

### Updated npm packages

- react-native: 0.52.2 → **0.53.0**
- react-native-navigation: 1.1.361 → **1.1.374**
- react-native-firebase: 3.2.2 → **3.2.4**
- lodash: 4.17.4 → **4.17.5**
- mobx: 3.4.1 → **3.5.1**
- detox: 6.0.4 → **7.0.1**

### Android

- Upgraded gradle to 4.4 and gradle build-tools to 3.1.0
- Patching npm packages build.gradle to buildToolsVersion 27.0.1

## 1.0.0

Initial release.
