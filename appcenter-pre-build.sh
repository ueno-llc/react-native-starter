COMMIT_MESSAGE=$(git log -1 --pretty=%B)
COMMIT_HASH="$BUILD_SOURCEVERSION"
LAST_ANDROID=$(git log --grep='\[release android\]' -1 | grep -o -E -e "[0-9a-f]{40}")
LAST_IOS=$(git log --grep='\[release ios\]' -1 | grep -o -E -e "[0-9a-f]{40}")

if [[ "$LAST_ANDROID" == "" ]]; then
  echo "[Ueno RNS] Warning: No previous [Android] build"
  LAST_ANDROID=$(git log --max-parents=0 HEAD | grep -o -E -e "[0-9a-f]{40}")
fi

if [[ "$LAST_IOS" == "" ]]; then
  echo "[Ueno RNS] Warning: No previous [iOS] build"
  LAST_IOS=$(git log --max-parents=0 HEAD | grep -o -E -e "[0-9a-f]{40}")
fi

TRIGGER_ANDROID=$(git diff --name-only $LAST_ANDROID..$COMMIT_HASH | grep "^android")
TRIGGER_IOS=$(git diff --name-only $LAST_IOS..$COMMIT_HASH | grep "^ios")

if [ ! -z "$GOOGLE_SERVICES_JSON" ]; then
  echo $GOOGLE_SERVICES_JSON | base64 --decode > "$APPCENTER_SOURCE_DIRECTORY/android/app/google-services.json"
fi

if [ ! -z "$GOOGLE_SERVICES_PLIST" ]; then
  echo $GOOGLE_SERVICES_PLIST | base64 --decode > "$APPCENTER_SOURCE_DIRECTORY/ios/react-native-starter/GoogleService-Info.plist"
fi

for KEY in $(cat .env.public | egrep "^[A-Za-z]+" | sed 's/\"/\\\"/g' | sed -n 's|\(.*\)=\(.*\)|\1|p'); do
  echo "$KEY=$(printf '%s\n' "${!KEY}")" >> "$APPCENTER_SOURCE_DIRECTORY/.env"
done

prepare_code_push() {
  npm install -g code-push-cli
  echo "[Ueno RNS] Logging into code-push-cli"
  code-push login --accessKey $CODEPUSH_ACCESS_KEY
}

if [ ! -z "$IOS_CODEPUSH_APPID" ]; then
  echo "[Ueno RNS] Lane is iOS"
  echo "[Ueno RNS] Last trigger: $LAST_IOS"
  echo "[Ueno RNS] Current trigger: $TRIGGER_IOS"

  if [[ "$TRIGGER_IOS" != "" ]] || [[ $COMMIT_MESSAGE = *"[BUILD]"* ]]; then
    echo "[Ueno RNS] Bumping version and build number"
    cd ios
    fastlane bump_version
    cd -
  else
    prepare_code_push
    echo "[Ueno RNS] Bundling and publishing code-push release..."
    code-push release-react $IOS_CODEPUSH_APPID ios --outputDir ./build --plistFile ./ios/react-native-starter/Info.plist --description "$COMMIT_MESSAGE"
    echo "[Ueno RNS] Shutting down build machine"
    curl -X PATCH "https://api.appcenter.ms/v0.1/apps/$IOS_CODEPUSH_APPID/builds/$APPCENTER_BUILD_ID" -H "accept: application/json" -H "X-API-Token: $APPCENTER_API_KEY" -H "Content-Type: application/json" -d "{ \"status\": \"cancelling\" }"
  fi
fi

if [ ! -z "$ANDROID_CODEPUSH_APPID" ]; then
  echo "[Ueno RNS] Lane is Android"
  echo "[Ueno RNS] Last trigger: $LAST_ANDROID"
  echo "[Ueno RNS] Current trigger: $TRIGGER_ANDROID"

  if [[ "$TRIGGER_ANDROID" != "" ]] || [[ $COMMIT_MESSAGE = *"[BUILD]"* ]]; then
    echo "[Ueno RNS] Bumping version and build number"
    cd android
    fastlane bump_version
    cd -
  else
    prepare_code_push
    echo "[Ueno RNS] Bundling and publishing code-push release..."
    code-push release-react $ANDROID_CODEPUSH_APPID android --outputDir build --description "$COMMIT_MESSAGE"
    echo "[Ueno RNS] Shutting down build machine"
    curl -X PATCH "https://api.appcenter.ms/v0.1/apps/$ANDROID_CODEPUSH_APPID/builds/$APPCENTER_BUILD_ID" -H "accept: application/json" -H "X-API-Token: $APPCENTER_API_KEY" -H "Content-Type: application/json" -d "{ \"status\": \"cancelling\" }"
  fi
fi
