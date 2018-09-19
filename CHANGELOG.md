# Changelog
All notable changes to this project will be documented in this file.

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
