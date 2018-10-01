# Installing dependencies

This starter kit will not work with `react-native link PACKAGE_NAME`.

 - All native iOS dependencies need to be manually installed with cocoapods.
 - All native Android dependencies need to be manually installed with gradle.

## iOS

Go to `ios/Podfile`
```ruby
# Add this
pod 'react-native-blur', :path => '../node_modules/react-native-blur'
```

## Android

Go to `android/settings.gradle`
```groovy
// Add this
include ':react-native-blur'
project(':react-native-blur').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-blur/android')
```

Go to `android/app/build.gradle`
```groovy
dependencies {
    ...
    implementation project(':react-native-config')
    implementation project(':react-native-blur')      // <-- Add this line
    implementation project(':react-native-code-push')
    ...
}
```

Go to `android/app/src/main/java/your_bundle_indentifier/MainApplication.java`
```java
import com.cmcewen.blurview.BlurViewPackage; // <-- Add this line

protected List<ReactPackage> getPackages() {
    ...
    new BlurViewPackage(), // <-- Add this line
    ...
);
```

!> The dependency I want to use doesn't have a Podspec file

Don't worry, we got your back. To fix that, we have two utils for you, `yarn podspec` and `yarn patch-package`.

1. First run `yarn podspec` to create a podspec for your dependency.
2. Run `pod install` in the `./ios` folder.
3. Once working, run `yarn patch-package PACKAGE_NAME`.
4. Commit your changes you're done.

?> Example installation [Click here the sample commit](https://github.com/ueno-llc/react-native-starter/commit/6e546ebc20bf1102a82d36e93eef52551d30ffed)
