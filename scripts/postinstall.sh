./scripts/build-env.sh

# Add podspecs
git apply --directory=node_modules/react-native-navigation ./scripts/patches/react-native-navigation-podspec.patch
git apply --directory=node_modules/react-native-navigation ./scripts/patches/react-native-navigation-52.patch

# Allow multidex in firebase.
cat node_modules/react-native-firebase/android/build.gradle | sed 's/\/\/ multiDexEnabled true/multiDexEnabled true/' > multidex.tmp
mv multidex.tmp node_modules/react-native-firebase/android/build.gradle

# Pod install
if [ -z "$TRAVIS" ]; then
  (cd ios; pod install; cd -)
fi
