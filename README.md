![Build status](https://travis-ci.org/ueno-llc/react-native-starter.svg?branch=master) ![Dependencies](https://david-dm.org/ueno-llc/react-native-starter/status.svg) ![devDependencies](https://david-dm.org/ueno-llc/react-native-starter/dev-status.svg)

# React Native Starter

This is a starter to quickly get up and running with a opinionated dependencies.

Jump down to the [install section](#installing-on-mac-os-x-sierra-10125) for install on fresh mac. For other, these are required:

```
brew tap wix/brew
brew install --HEAD applesimutils
npm install -g react-native-cli detox-cli
# Also good to have for app management
npm install -g sentry-cli code-push-cli
```

## Features
 - [x] react-native-navigation *(native)*
 - [x] react-native-config *(native)*
 - [x] code-push *(native)*
 - [x] sentry *(native)*
 - [x] firebase *(native)*
 - [x] mobx, mobx-react and mobx-persist
 - [x] lodash and lodas-decorators
 - [x] date-fns
 - [x] react-native-ui-lib

## Environment config and secrets

All environment variables are in `.env` for cross-platform accessibility.
- Environment variables can be read with `import config from 'config';`.
- Environment hot-reload support with `yarn build:env`.

## Renaming the app

```
./scripts/rename.sh "New App Name" com.ueno.newappname
```

Also remember to change icons to iOS and Android.


## Network requests

Development mode proxies all network requests to the open devtools network panel.

Get a CORS extension for Chrome to allow requests to fetch restricted requests and enable for the devtools page.

If you are having problems with this feature, you can bypass network requests with the following:

```js
import xhr from 'utils/xhr';

xhr.bypass(() => fetch('https://google.com'))
.then(data => data.json());

const ws = new WebSocket('ws://google.com');
xhr.bypass(() => ws.open());

// Also supported
xhr.toggle();
xhr.enabled();
xhr.disabled();
```


## Integration, Unit and Code Quality Testing

Code is linted with eslint using @ueno/eslint config with some modifications.

```bash
yarn lint
```

Jest is also used for unit tests with snapshots and enzyme for more granular tests.

```bash
yarn test
```

## E2E Testing

This project uses detox to run end-to-end UI testing with jest as test runner under the hood. Some tooling is needed to get started, but the tests will also run on a CI.

You can build the UI test app for the first time (you need to build again if any native code has changed).

```bash
yarn build:e2e:ios
yarn build:e2e:android
```

Run UI tests.

```bash
yarn test:e2e:ios
yarn test:e2e:android
```


## Continuous Delivery

![Imgur](https://i.imgur.com/o91jUrQ.png)

The pipeline to continously deliver the app are two separate processes integrated into one. Each platform is ran individually in a travis matrix (osx, android and node_js).

Commit changes are detected in `./android` and `./ios` folder that will make native builds automatically.

New builds will also be triggered via commit message tags `[BUILD]` for both or explicitly `[BUILD IOS]` and `[BUILD ANDROID]`.

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

Every task listed above is conditionally executed based on other task actions. It will for example not deploy a code-push update for android if a native android build was done (and same for iOS).

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

# Publish the app

There are some steps required to publish the app to Google Play Store and iTunes App Store.

Update .env with your bundle-ids.
```
ANDROID_BUNDLE_ID=com.companyname.appnameandroid
IOS_BUNDLE_ID=com.companyname.appnameios
```

## Setup Code Push and update .env

Create an app in Mobile Center for each platform (iOS, Android). Lets say the organization is `CompanyName` and app name is `app-name-$platform`.

Update .env
```
ANDROID_CODEPUSH_APPID=CompanyName/app-name-android
IOS_CODEPUSH_APPID=CompanyName/app-name-android
```

Then by using the command-line utility, add deployment targets to each app and store the secrets.

```
code-push deployment add CompanyName/app-name-android
code-push deployment add CompanyName/app-name-ios
```

Update .env
```
ANDROID_CODEPUSH_DEPLOYMENT_KEY=productionKeyFromStepAbove
IOS_CODEPUSH_DEPLOYMENT_KEY=productionKeyFromStepAbove
```

## Setup Sentry and update environment keys

Create project in Sentry and update your .env (just one project needed for both platforms).
```
SENTRY_DSN=https://a:b@sentry.io/12345
SENTRY_PROJECT=app-name
SENTRY_ORG=company-name
```

Then get authorization token from here (https://docs.sentry.io/api/auth/)

```
SENTRY_AUTH_TOKEN=abcdef0123456789
```

## Create app in iTunes Connect

Create app in itunes connect
Update your `ios/fastlane/[Appfile,Matchfile]`
Run `fastlane match appstore`

Note: You need to have a repository containing all your certificates managed by fastlane match that travis can access.

## Create app in Play Store

Create app in play store.
Get your `playstore.json` file and put into android folder (https://docs.fastlane.tools/actions/supply/#setup).
Update your `android/fastlane/[Appfile,Matchfile]`.
Run `fastlane supply run`

Note: You need to upload at least one APK to the playstore manually before Continous Deployment can take over.


## Setup travis

Sign into travis with your GitHub account, find your repository in the list and mark the checkbox.

Note: It is extremely important to use secret environment variables if the target repository is public (travis.org).

Add all your environment variables (public/secrets)
```
travis env set ANDROID_BUNDLE_ID=com.companyname.appnameandroid
travis encrypt MATCH_PASSWORD=yourpassword --add
```

Run this script to add secret files to your repository that travis can read. When promted for password, use your password set for `MATCH_PASSWORD`.
```
./scripts/gen-secrets.sh
```

Commit and push should start travis.
