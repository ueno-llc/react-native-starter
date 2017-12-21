# Add podspecs
git apply --directory=node_modules/react-native-navigation ./scripts/patches/react-native-navigation.patch

source "$(dirname "$0")/build-env.sh"

# Pod install
if [ -z "$TRAVIS" ]; then
  (cd ios; pod install; cd -)
fi