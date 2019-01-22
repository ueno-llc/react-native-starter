#/bin/sh

echo "[Ueno RNS] Config building..."

ENV_PATH=".env"
RNC_PATH="./node_modules/react-native-config/ios"
GOOGLESERVICE_JSON_PATH="./android/app/google-services.json"
GOOGLESERVICE_INFO_PATH="./ios/react-native-starter/GoogleService-Info.plist"
ANDROID_DIRECTORY="false"

if [[ $PWD == *"android"* ]]; then
  ANDROID_DIRECTORY="true"
fi

GOOGLESERVICE_JSON_CONTENT='{\n
\t"project_info": {\n
\t\t"project_id": "sample",\n
\t\t"project_number": "000000000000",\n
\t\t"name": "sample",\n
\t\t"firebase_url": "https://sample.firebaseio.com"\n
\t},\n
\t"client": [\n
\t\t{\n
\t\t\t"client_info": {\n
\t\t\t\t"mobilesdk_app_id": "1:000000000000:android:ffffffffffffffff",\n
\t\t\t\t"client_id": "android:com.ueno.reactnativestarter",\n
\t\t\t\t"client_type": 1,\n
\t\t\t\t"android_client_info": {\n
\t\t\t\t\t"package_name": "com.ueno.reactnativestarter",\n
\t\t\t\t\t"certificate_hash": []\n
\t\t\t\t}\n
\t\t\t},\n
\t\t\t"api_key": [\n
\t\t\t\t{\n
\t\t\t\t\t"current_key": "sample"\n
\t\t\t\t}\n
\t\t\t]\n
\t\t}\n
\t],\n
\t"configuration_version": "1"\n
}'

GOOGLESERVICE_INFO_CONTENT='<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n
\t<dict>\n
\t</dict>\n</plist>'

if [ $ANDROID_DIRECTORY = "true" ]; then
  ENV_PATH="../../.env"
  RNC_PATH="../../node_modules/react-native-config/ios"
  GOOGLESERVICE_JSON_PATH="./google-services.json"
  GOOGLESERVICE_INFO_PATH="../../ios/react-native-starter/GoogleService-Info.plist"
fi

if [ ! -f $GOOGLESERVICE_INFO_PATH ]; then
  echo "[Ueno RNS] Warning: No GoogleService-Info.plist file in ios app directory... We created a placeholder for you!"
  echo $GOOGLESERVICE_INFO_CONTENT > $GOOGLESERVICE_INFO_PATH
fi

if [ ! -f $GOOGLESERVICE_JSON_PATH ]; then
  echo "[Ueno RNS] Warning: No google-services.json file in android app directory... We created a placeholder for you!"
  echo $GOOGLESERVICE_JSON_CONTENT > $GOOGLESERVICE_JSON_PATH
fi

if [ ! -f $ENV_PATH ]; then
  echo "[Ueno RNS] Warning: No .env file found... Copied .env.public to .env!"

  if [ $ANDROID_DIRECTORY = "true" ]; then
    cp ../../.env.public ../../.env
  else
    cp .env.public .env
  fi
fi

if [ ! -z "$ENVFILE" ]; then
  TARGET_ENV=$ENVFILE
fi

echo "[Ueno RNS] Building environment config"
echo "[Ueno RNS] Using $ENV_PATH"

if [ ! -z "$SYMROOT" ]; then
  mkdir -p $SYMROOT

  # Build dotenv
  cd $RNC_PATH
  ./ReactNativeConfig/BuildDotenvConfig.ruby
  cd -

  # Copy generated dotenv files to node_modules directory
  cp "$BUILD_DIR/GeneratedInfoPlistDotEnv.h" "$RNC_PATH/ReactNativeConfig/GeneratedInfoPlistDotEnv.h"
  cp "$SYMROOT/GeneratedDotEnv.m" "$RNC_PATH/ReactNativeConfig/GeneratedDotEnv.m"
  echo "Copied GeneratedInfoPlistDotEnv.h and GeneratedDotEnv.m to $RNC_PATH"
fi

# Generate dynamic environment for development
JSON="export default {$(cat $ENV_PATH | egrep "^[A-Za-z]+" | sed 's/\"/\\\"/g' | sed -n 's|\(.*\)=\(.*\)$|"\1":"\2",|p' | sed 's|\\\"||g') \"generatedAt\": \"$(date '+%FT%T')\" }"
echo "[Ueno RNS] Generating ./src/config.env.js"

if [ $ANDROID_DIRECTORY = "true" ]; then
  echo $JSON > ../../src/config.env.js
else
  echo $JSON > ./src/config.env.js
fi

# Build config
echo "[Ueno RNS] Config built successfully!"
