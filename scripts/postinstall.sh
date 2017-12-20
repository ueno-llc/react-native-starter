# Add podspecs
git apply --directory=node_modules/react-native-navigation ./scripts/patches/react-native-navigation.patch

# Pod install
if [ -z "$TRAVIS" ]; then
  (cd ios; pod install; cd -)
fi