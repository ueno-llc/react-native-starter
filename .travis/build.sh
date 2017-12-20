if [[ "$TRAVIS_FINISHED" == "1" ]]; then
  # This lane has finished. Exit successfully.
  exit 0
fi

# Lint code
yarn lint

# Test code
yarn test

# TODO: Test with detox

if [[ "$TRAVIS_BRANCH" == "master" ]]; then

  if [[ "$LANE" == "ios" && "$TRAVIS_BUILD_IOS" == "1" ]]; then
    fastlane ios travis
  fi

  if [[ "$LANE" == "android" && "$TRAVIS_BUILD_ANDROID" == "1" ]]; then
    fastlane android travis
  fi

  if [[ "$LANE" == "js" ]]; then
    # Login to code-push-cli
    code-push login --accessKey $CODEPUSH_ACCESS_KEY

    if [[ "$TRAVIS_BUILD_IOS" == "0" ]]; then
      export SENTRY_PROPERTIES=./ios/sentry.properties
      code-push release-react $IOS_CODEPUSH_APPID ios --outputDir build --description "$TRAVIS_COMMIT_MESSAGE"
      sentry-cli react-native codepush $IOS_CODEPUSH_APPID ios ./build --bundle-id $IOS_BUNDLE_ID
    fi

    if [[ "$TRAVIS_BUILD_ANDROID" == "0" ]]; then
      export SENTRY_PROPERTIES=./android/sentry.properties
      code-push release-react $ANDROID_CODEPUSH_APPID android --outputDir build --description "$TRAVIS_COMMIT_MESSAGE"
      sentry-cli react-native codepush $ANDROID_CODEPUSH_APPID android ./build --bundle-id $ANDROID_BUNDLE_ID
    fi
  fi
fi
