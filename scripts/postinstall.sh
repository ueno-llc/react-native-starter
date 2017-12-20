# Add podspecs
git apply --directory=node_modules/react-native-navigation ./scripts/patches/react-native-navigation.patch

# Pod install
(cd ios; pod install; cd -)
