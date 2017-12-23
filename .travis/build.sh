source "$(dirname "$0")/env.sh"

if [[ "$TRAVIS_FINISHED" == "1" ]]; then
  echo "Finished. Exit 0"
  # This lane has finished. Exit successfully.
  exit 0
fi

# Lint code
yarn lint

# Test code
yarn test

# TODO: detox

if [[ "$TRAVIS_BRANCH" == "master" ]]; then

  # Decrypt secret files
  echo "Decrypting files (not available in PRs from forks)"
  openssl aes-256-cbc -K $encrypted_4fa633217742_key -iv $encrypted_4fa633217742_iv -in .travis/secrets.tar.enc -out secrets.tar -d
  tar xvf secrets.tar

  # Setup ssh-agent
  git config user.name "Travis CI"
  git config user.email "travis@travis-ci.org"
  eval `ssh-agent -s`
  ssh-add .travis/deploy_key

  # Install Sentry CLI (cross-platform)
  curl -sL https://sentry.io/get-cli/ | bash

  if [[ "$LANE" == "ios" && "$TRAVIS_BUILD_IOS" == "1" ]]; then
    cd ios
    fastlane travis
  fi

  if [[ "$LANE" == "android" && "$TRAVIS_BUILD_ANDROID" == "1" ]]; then
    cd android
    fastlane travis
  fi

  if [[ "$LANE" == "js" ]]; then
    # Install code-push-cli
    npm install -g code-push-cli

    # Login to code-push-cli
    code-push login --accessKey $CODEPUSH_ACCESS_KEY

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