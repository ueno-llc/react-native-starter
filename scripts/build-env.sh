#/bin/sh
# PWD is ../

TARGET_ENV=".env"
RNCDIR="./node_modules/react-native-config/ios"

GOOGLESERVICE_JSON_FILE="./android/app/google-services.json"
GOOGLESERVICE_JSON_CONTENT='{"project_info":{"project_id":"sample","project_number":"000000000000","name":"sample","firebase_url":"https://sample.firebaseio.com"},"client":[{"client_info":{"mobilesdk_app_id":"1:000000000000:android:ffffffffffffffff","client_id":"android:com.daviswhitehead.foundation","client_type":1,"android_client_info":{"package_name":"com.daviswhitehead.foundation","certificate_hash":[]}},"api_key":[{"current_key":"sample"}]}],"configuration_version":"1"}'
GOOGLESERVICE_INFO_FILE="./ios/foundation/GoogleService-Info.plist"
GOOGLESERVICE_INFO_CONTENT=$(cat <<EOL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
</dict>
</plist>
EOL
)

if [ ! -f $GOOGLESERVICE_INFO_FILE ]; then
  echo "[Ueno RNS] Warning: No GoogleService-Info.plist file in ios app directory... Added placeholder for now!"
  echo $GOOGLESERVICE_INFO_CONTENT > $GOOGLESERVICE_INFO_FILE
fi

if [ ! -f $GOOGLESERVICE_JSON_FILE ]; then
  echo "[Ueno RNS] Warning: No google-services.json file in android app directory... Added placeholder for now!"
  echo $GOOGLESERVICE_JSON_CONTENT > $GOOGLESERVICE_JSON_FILE
fi

if [ ! -f ".env" ]; then
  echo "[Ueno RNS] Warning: No .env file found... Copied .env.public to .env!"
  cp .env.public .env
fi

if [ ! -z "$ENVFILE" ]; then
  TARGET_ENV=$ENVFILE
fi

echo "[Ueno RNS] Building environment config"
echo "[Ueno RNS] Using $TARGET_ENV"

if [ ! -z "$SYMROOT" ]; then
  mkdir -p $SYMROOT

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
echo "[Ueno RNS] Generating ./src/config.env.js"
echo $JSON > ./src/config.env.js

# Build config
echo "[Ueno RNS] Config built successfully"
