source "$(dirname "$0")/env.sh"

if [[ "$TRAVIS_FINISHED" == "1" ]]; then
  echo "Finished. Exit 0"
  # This lane has finished. Exit successfully.
  exit 0
fi

# Lint code
yarn lint || exit $?

# Test code
yarn test || exit $?

# TODO: detox

if [ ! -z "$MATCH_PASSWORD" ]; then
  # Setup ssh-agent for GitHub pushes
  # This is only for public repositories with no write-access.
  git config user.name "Travis CI"
  git config user.email "travis@travis-ci.org"
  eval `ssh-agent -s`
  ssh-add .travis/id_rsa
  REPO=`git config remote.origin.url`
  git remote set-url origin ${REPO/https:\/\/github.com\//git@github.com:}
  git ls-remote
fi

if [[ "$TRAVIS_BRANCH" == "master" ]]; then

  # Install Sentry CLI (cross-platform)
  curl -sL https://sentry.io/get-cli/ | bash

  if [[ "$LANE" == "ios" && "$TRAVIS_BUILD_IOS" == "1" ]]; then
    cd ios
    fastlane travis || exit $?
  fi

  if [[ "$LANE" == "android" && "$TRAVIS_BUILD_ANDROID" == "1" ]]; then
    cd android
    fastlane travis || exit $?
  fi

  if [[ "$LANE" == "js" ]]; then
    # Install code-push-cli
    npm install -g code-push-cli || exit $?

    # Login to code-push-cli
    code-push login --accessKey $CODEPUSH_ACCESS_KEY || exit $?

    if [[ "$TRAVIS_BUILD_IOS" == "0" ]]; then
      code-push release-react $IOS_CODEPUSH_APPID ios --outputDir build --description "$TRAVIS_COMMIT_MESSAGE"
      sentry-cli react-native codepush $IOS_CODEPUSH_APPID ios ./build --bundle-id $IOS_BUNDLE_ID
    fi

    if [[ "$TRAVIS_BUILD_ANDROID" == "0" ]]; then
      code-push release-react $ANDROID_CODEPUSH_APPID android --outputDir build --description "$TRAVIS_COMMIT_MESSAGE"
      sentry-cli react-native codepush $ANDROID_CODEPUSH_APPID android ./build --bundle-id $ANDROID_BUNDLE_ID
    fi
  fi
fi