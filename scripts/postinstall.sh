./scripts/build-env.sh

# Meh
rm -rf ./node_modules/react-native-navigation/lib/android/app/src/main/java/com/reactnativenavigation/react/NavigationReactNativeHost.java

# Pod install
if [ -z "$TRAVIS" ]; then
  (cd ios; pod install; cd -)
fi
