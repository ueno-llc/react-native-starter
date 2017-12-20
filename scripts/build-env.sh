#/bin/sh
# PWD is ../

TARGET_ENV=".env"
RNCDIR="./node_modules/react-native-config/ios"

if [ ! -z "$ENVFILE" ]; then
  TARGET_ENV=$ENVFILE
fi

echo "> Building environment config"
echo "Using $TARGET_ENV"

if [ ! -z "$SYMROOT" ]; then
  # Build dotenv
  cd $RNCDIR
  ./ReactNativeConfig/BuildDotenvConfig.ruby
  cd -

  # Copy generated dotenv files to node_modules directory
  cp "$BUILD_DIR/GeneratedInfoPlistDotEnv.h" "$RNCDIR/ReactNativeConfig/GeneratedInfoPlistDotEnv.h"
  cp "$SYMROOT/GeneratedDotEnv.m" "$RNCDIR/ReactNativeConfig/GeneratedDotEnv.m"
  echo "Copied GeneratedInfoPlistDotEnv.h and GeneratedDotEnv.m to $RNCDIR"
fi

# Generate dynamic environment for development
JSON="export default {$(cat $TARGET_ENV | egrep "^[A-Za-z]+" | sed 's/\"/\\\"/g' | sed -n 's|\(.*\)=\(.*\)$|"\1":"\2",|p' | sed 's|\\\"||g') \"generatedAt\": \"$(date '+%FT%T')\" }"
echo "Generating ./src/config.env.js"
echo $JSON > ./src/config.env.js

# Build config
echo "Config built successfully"