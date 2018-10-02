# Debugging

You might get issues that only happens when you are in a release environnement. We don't want to build a release on a developer's computer, but most likely using services for that, as AppCenter. Even though, it's possible to tweak some files to run a release build on your device or a simulator and let you debug this tricky issue.

## iOS

The first and only thing to do, should be to switch from `Debug` to `Release` in your scheme configuration as followed:

<kbd>alt + click</kbd> on your scheme:

![xcode-3](https://user-images.githubusercontent.com/937328/46286290-315c3100-c56e-11e8-9e41-361b7f35d697.png)

And then change from `Debug` to `Release`:

![xcode-4](https://user-images.githubusercontent.com/937328/46286305-41741080-c56e-11e8-801a-f1562660cc51.png)

### Troubleshooting

You tried the previous step, but you run into a `main.jsbundle does not exist. This must be a bug with + echo 'React Native'`. You gonna have to build a `main.jsbundle` file manually and add it to Xcode. Use the following command:

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

Additionally, you may want to open the console from your device to see in real time what happens on it. In this case go to `Xcode > Window -> Devices and Simulators -> Choose your device > Open Console`.

_____________

## Android

TODO

- Signed apk
- keystore
- password in .env
- adb logcat
