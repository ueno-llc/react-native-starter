# Add podspecs
git apply --directory=node_modules/react-native-navigation ./scripts/patches/react-native-navigation.patch

# Generate dotenv
touch ./ios/Config/GeneratedInfoPlistDotEnv.h
sh ./scripts/dotenv.sh

# Pod install
(cd ios; pod install; cd -)
