# Debugging

By default with React Native you can debug your code with the possibility to debug with the javascript console. Even though, you might get issues that only happens when you are in a release environnement. Here is a quick guide on the steps to follow to debug some release builds.

!> Under a debug build, you may have issues to access localhost under your device. It might be your router that doesn't allow UDP connections.

!> Under a release build, you won't be able to use live-reload or hot-reload feature, you will have to build each time you change your code.

## iOS

You should be able to switch from `Debug` to `Release` in your scheme configuration from Xcode as followed:

<kbd>alt + click</kbd> on your scheme:

![xcode-1](https://user-images.githubusercontent.com/937328/46286290-315c3100-c56e-11e8-9e41-361b7f35d697.png)

And then change from `Debug` to `Release`:

![xcode-2](https://user-images.githubusercontent.com/937328/46286305-41741080-c56e-11e8-801a-f1562660cc51.png)

?> You can open the console to see the logs of your phone `Xcode > Window > Devices and Simulators > Choose your device > Open Console`

### Troubleshooting

<details>
  <summary>"main.jsbundle does not exist. This must be a bug with + echo 'React Native'"</summary>

  You gonna have to build a `main.jsbundle` file manually and add it to Xcode. Use the following command:

  ```bash
  react-native bundle --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios --platform ios
  ```

  The file is now created, we have to link it to Xcode

  1. Open Xcode, and add click on `Add Files to "…"`

  ![xcode-1](https://user-images.githubusercontent.com/937328/46285935-cd853880-c56c-11e8-9f76-7472ac4aca56.png)

  2. Select the `main.jsbundle` and `assets` folder that have been generated in the `ios` folder

  ![xcode-2](https://user-images.githubusercontent.com/937328/46286054-340a5680-c56d-11e8-8580-164baf98eb34.png)

  We have the bundle and assets linked with Xcode, we now have to tell to the native code to use our generated bundle file. Open `AppDelegate.m`, and change it like this:

  ```diff
  -  #ifdef DEBUG
  -    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  -  #else
  -    jsCodeLocation = [CodePush bundleURL];
  -  #endif

  +  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  ```

  It's all set now, you should be able to run the release configuration. Of course this is only for a debug purpose, we do not recommand you to push these changes on your repository.

  If you got any issue to launch the app through your device because of some signing issue, follow these steps: https://stackoverflow.com/a/39498874
</details>

## Android

You should be able to switch from `Debug` to `Release` in your Build Variants from Android Studio:

![android-studio](https://user-images.githubusercontent.com/937328/51538954-863bf400-1e4a-11e9-9deb-c2464cb4b619.png)

?> You can open the console to see the logs of your phone `Android Studio > View > Tool Windows > Logcat`

### Troubleshooting

<details>
  <summary>"Unable to load script from assets 'index.android.bundle" (Android)</summary>

  You gonna have to build a `main.jsbundle` file manually and add it to Xcode. Use the following command:

  ```bash
  react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
  ```

  You can now run

  ```bash
  react-native run-android
  ```
</details>
