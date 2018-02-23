# Installing dependencies

This starter kit will not work with `react-native link $PACKAGE_NAME`.

 - All native iOS dependencies need to be manually installed with cocoapods.
 - All native Android dependencies need to be manually installed with gradle.

### The dependency I want to use doesn't have Podspec file

That's not good. I suggest you create a pull-request with a Podspec for the package.

To fix your problem in the app we use a solution with something called `patch-package`.

1. Add a podspec to the `node_modules/$PACKAGE_NAME/$PACKAGE_NAME.podspec` folder. ([Sample Podspec file](https://gist.github.com/joshyhargreaves/f972f4985f1c8e94d427cae3b2ea7513))
2. Modify it until you can run `pod install` in the ./ios folder.
3. Once satisfied, run `patch-package $PACKAGE_NAME`.
3. Commit your changes and now everybody will have this patched on yarn install.

### Example installation

[Click here to see a sample commit](https://github.com/ueno-llc/react-native-starter/commit/6e546ebc20bf1102a82d36e93eef52551d30ffed)

android/settings.gradle
```groovy
// ADD THIS
include ':react-native-blur'
project(':react-native-blur').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-blur/android')
```

android/app/build.gradle
```groovy
dependencies {
    ...
    implementation project(':react-native-config')
    implementation project(':react-native-blur')      // <-- ADD LINE
    implementation project(':react-native-code-push')
    ...
}
```

android/app/src/main/java/com/ueno/reactnativestarter/MainApplication.java
```java
import com.cmcewen.blurview.BlurViewPackage; // <-- ADD LINE


protected List<ReactPackage> getPackages() {
    ...
    new BlurViewPackage(), // <-- ADD LINE
    ...
);
```

ios/Podfile
```ruby
# ADD THIS
pod 'react-native-blur', :path => '../node_modules/react-native-blur'
```
