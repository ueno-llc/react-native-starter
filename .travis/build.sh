source "$(dirname "$0")/env.sh"

if [[ "$TRAVIS_FINISHED" == "1" ]]; then
  # This lane has finished. Exit successfully.
  exit 0
fi

# Lint code
set -o pipefail && yarn lint

# Test code
set -o pipefail && yarn test

# TODO: detox

if [[ "$TRAVIS_BRANCH" == "master" ]]; then

  # Install Sentry CLI (cross-platform)
  curl -sL https://sentry.io/get-cli/ | bash

  if [[ "$LANE" == "ios" && "$TRAVIS_BUILD_IOS" == "1" ]]; then
    cd ios
    set -o pipefail && fastlane travis
  fi

  if [[ "$LANE" == "android" && "$TRAVIS_BUILD_ANDROID" == "1" ]]; then
    cd android
    set -o pipefail && fastlane travis
  fi

  if [[ "$LANE" == "js" ]]; then
    # Install code-push-cli
    npm install -g code-push-cli

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
