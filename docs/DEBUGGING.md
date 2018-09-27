# Debugging IOS

You might get issues on real devices that only happens when you are in release mode. We don't want to build release build on developer's computer, but most likely using services for that, as AppCenter.

Even though, it's possible to tweak some files to run a release build on your device or simulator.

## IOS

You gonna need to build a `.jsbundle` file to add into Xcode. Because of difference of babels' versions between react-native and react we will install `babel/runtime`

```bash
yarn add @babel/runtime -ED
```

Then, we will use it, open the root file `index.js` and add this

```diff
+ import applyDecoratedDescriptor from '@babel/runtime/helpers/esm/applyDecoratedDescriptor';
+ import initializerDefineProperty from '@babel/runtime/helpers/esm/initializerDefineProperty';

+ Object.assign(babelHelpers, {
+   applyDecoratedDescriptor,
+   initializerDefineProperty,
+ });

require('./src/index.ts');
```

We are now ready to build the bundle file and the assets folder for the release, use this command

```bash
react-native bundle --dev false --entry-file index.js --bundle-output ios/main.jsbundle --assets-dest ios --platform ios
```

Now we have to link the file and folder to the Xcode project.

1. Open Xcode
2. Go to the project navigator
3. Expand the project and select your project name folder
4. Right-click > Add Files to "…"
5. Select the `main.jsbundle` and assets folder that have been generated in the `ios` folder

We now need to tell to Xcode to use on `main.jsbundle` and not our codepsuh assets. Open `AppDelegate.m`, change it like this

```diff
-  #ifdef DEBUG
-    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
-  #else
-    jsCodeLocation = [CodePush bundleURL];
-  #endif

+  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
```

Clean the Xcode project, and run again in release mode, it should be all set now. Of course this is for debug purpose, we do not recommand you to push this.

If you got any issue to launch the app through your device because of some signing issue, follow these steps: https://stackoverflow.com/a/39498874

TODO -> xcode -> window -> devices -> open console

## Android

TODO - Signed apk -> keystore -> password in .env -> adb logcat
