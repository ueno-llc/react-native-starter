![Build status](https://travis-ci.org/ueno-llc/react-native-starter.svg?branch=master)

# React Native Starter

This is a starter to quickly get up and running with a opinionated dependencies.

Jump down to the [install section](#installing-on-mac-os-x-sierra-10125) for install on fresh mac.

## Features
 - [x] react-native-navigation *(native)*
 - [x] react-native-config *(native)*
 - [x] code-push *(native)*
 - [x] sentry *(native)*
 - [x] firebase *(native)*
 - [x] mobx, mobx-react and mobx-persist
 - [x] lodash and lodas-decorators
 - [x] date-fns

## Environment config and secrets

All environment variables are in `.env` for cross-platform accessibility.
- Environment variables can be read with `import config from 'config';`.
- Environment hot-reload support with `yarn reload-env`.

## E2E Testing

This project uses detox to run end-to-end UI testing with jest as test runner under the hood. Some tooling is needed to get started, but the tests will also run on a CI.

### Setup tools

```bash
brew tap wix/brew
brew install --HEAD applesimutils
npm install -g detox-cli
```

### Run the tests

```bash
npm start
gem install xcpretty
detox build --configuration ios.sim.release
detox test --configuration ios.sim.release
```

## Integration, Unit and Code Quality Testing

Code is linted with eslint using @ueno/eslint config with some modifications.

```bash
npm run lint
```

Jest is also used for unit tests with snapshots and enzyme for more granular tests.

```bash
npm run test
```

## Continuous Delivery

![Imgur](https://i.imgur.com/o91jUrQ.png)

The pipeline to continously deliver the app are two separate processes integrated into one. Each platform is runned individually in a travis matrix (osx, android and node_js).

Changes are detected in `./android` and `./ios` folder that will make native builds automatically. New builds will also be triggered via commit message tags `[BUILD]` for both or explicitly `[BUILD IOS]` and `[BUILD ANDROID]`.

### Android ci
 - run `jest`, `lint` and `detox test` in Android Emulator
 - build a release and upload to Play Store
 - update build number, git commit, tag and push to github

### iOS
 - run `jest`, `lint` and `detox test` in iOS Simulator
 - builds a release and uploads to TestFlight
 - update build number, git commit, tag and push to github

### CodePush
 - run `jest` and `lint`
 - packs and deploys bundle to code-push android staging.
 - packs and deploys bundle to code-push ios staging.
 - upload source maps to sentry

Every task above is runned conditionally based on other task actions, like not deploy a code-push update for android if 

## Installing on Mac OS X Sierra 10.12.5

Below is a tutorial to get up and running on a mac machine. Assuming you have brew installed.

### Install dependencies

```bash
brew install git yarn cocoapods watchman
brew cask install java android-sdk android-platform-tools
echo "export ANDROID_HOME=/usr/local/opt/android-sdk" >> ~/.bash_profile
source ~/.bash_profile
npm install -g react-native-cli
(cd ios; pod repo update; cd -)
yarn install
```

The packager can be started via `yarn start`.

### Install iOS Simulator

Install xcode and this should work out of the box

```bash
react-native run-ios
```


### Install Android Emulator

Install android studio https://developer.android.com/studio/index.html

```bash
# Shortcut
curl https://dl.google.com/dl/android/studio/install/2.3.3.0/android-studio-ide-162.4069837-mac.dmg > ~/Downloads/android-studio.dmg
open ~/Downloads/android-studio.dmg
```

Drag to Applications, open Android Studio there, hit next next next finish etc.
Take a coffee break, installing the dependencies takes a bit time.

1. Click "Open an existing android studio project"
2. Select the folder ~/Projects/ueno-app/android
3. Wait for everything to finish initializing, takes some time.
4. In "Messages Gradle Sync" you should see error "Failed to find target etc..", click "Install missing platform(s) and sync project".
5. Accept licenses and download stuff.
6. Repeat number 3.
7. Don't update gradle to 3.3

I personally needed to install additionally
 - Android SDK Platform 25 (revision: 3)
 - Android SDK Build-Tools 25.0.2

Close Android Studio

### Running on Android device or emulator

Plug your phone in to USB port. (Skip if emulator)

```bash
adb devices
```

Go to phone and check "Always allow ..." and hit Allow.

```bash
react-native run-android
```

App now opens on device, but if you will be prompted that the app want's to  draw overlay over other apps. Scroll down to our app and tick YES.
Go back to app, shake device and hit Reload.
