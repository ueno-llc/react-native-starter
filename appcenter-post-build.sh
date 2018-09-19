# On iOS builds do the following
if [ ! -z "$IOS_CODEPUSH_APPID" ]; then
  echo "[Ueno RNS] Tagging iOS version and commit to GitHub"
  cd ios
  fastlane tag_version
  cd -
  echo "[Ueno RNS] Completed"
fi

# On Android builds do the following
if [ ! -z "$ANDROID_CODEPUSH_APPID" ]; then
  echo "[Ueno RNS] Tagging Android version and commit to GitHub"
  cd android
  fastlane tag_version
  cd -
  echo "[Ueno RNS] Completed"
fi
