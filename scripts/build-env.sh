#/bin/sh
# PWD is ../

TARGET_ENV=".env"
RNCDIR="./node_modules/react-native-config/ios"

GOOGLESERVICE_INFO_FILE="./ios/react-native-starter/GoogleService-Info.plist"
GOOGLESERVICE_INFO_CONTENT=$(cat <<EOL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>AD_UNIT_ID_FOR_BANNER_TEST</key>
	<string></string>
	<key>AD_UNIT_ID_FOR_INTERSTITIAL_TEST</key>
	<string></string>
	<key>CLIENT_ID</key>
	<string></string>
	<key>REVERSED_CLIENT_ID</key>
	<string></string>
	<key>API_KEY</key>
	<string></string>
	<key>GCM_SENDER_ID</key>
	<string></string>
	<key>PLIST_VERSION</key>
	<string>1</string>
	<key>BUNDLE_ID</key>
	<string></string>
	<key>PROJECT_ID</key>
	<string></string>
	<key>STORAGE_BUCKET</key>
	<string></string>
	<key>IS_ADS_ENABLED</key>
	<false></false>
	<key>IS_ANALYTICS_ENABLED</key>
	<false></false>
	<key>IS_APPINVITE_ENABLED</key>
	<false></false>
	<key>IS_GCM_ENABLED</key>
	<false></false>
	<key>IS_SIGNIN_ENABLED</key>
	<false></false>
	<key>GOOGLE_APP_ID</key>
	<string></string>
	<key>DATABASE_URL</key>
	<string></string>
</dict>
</plist>
EOL
)

if [ ! -f $GOOGLESERVICE_INFO_FILE ]; then
  echo "Warning: No GoogleService-Info.plist file in ios app directory... Added placeholder for now!"
  echo $GOOGLESERVICE_INFO_CONTENT > $GOOGLESERVICE_INFO_FILE
fi

if [ ! -f ".env" ]; then
  echo "Warning: No .env file found... Copied .env_example to .env!"
  cp .env_example .env
fi

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
