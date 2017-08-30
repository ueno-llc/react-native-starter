# Ueno's React Native starter

This is a starter to quickly get up and running with few major dependencies that we always use at Ueno.

## Native Dependencies
 - [x] react-native-navigation
 - [x] react-native-code-push
 - [x] react-native-config

## Config

We use react-native-config to get access to .env variables on both build- and runtime.
Only the JS part of the library is used, the native code lives inside `ios/Config`.

- To read from environment variables you can `import config from 'config';`.
- To hot reload JS side environment variables, you can run `yarn reload-env`.

## Components

The `./components` folder includes shared components like buttons, inputs, cards etc. while
components inside a screen folder should be components that only apply to specific screen
or within its navigation stack (modals, shared element transitions, etc).

## Installing on Mac OS X Sierra 10.12.5

Below is a tutorial to get up and running on a mac machine. Assuming you have brew installed.

### React Native Packager

```bash
brew install git yarn cocoapods watchman
brew cask install android-platform-tools
npm install -g react-native-cli
```

I ran into this problem https://github.com/facebook/react-native/issues/910
Fixed with comment #2 or #3

```bash
(cd ios; pod repo update; cd -)
yarn install
yarn start
```

Now react native bundler is running successfully.
Next up is Android and iOS tools.

### iOS

Install xcode and this should work out of the box

```bash
react-native run-ios
```


### Android (sigh)

```bash
brew cask install java
brew cask install android-sdk
echo "export ANDROID_HOME=/usr/local/opt/android-sdk" >> ~/.bash_profile
source ~/.bash_profile
```

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
