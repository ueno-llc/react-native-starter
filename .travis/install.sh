TRAVIS_BUILD_ANDROID=0
TRAVIS_BUILD_IOS=0
TRAVIS_FINISHED=0

# Set config env
echo "export default {};" > src/config.env.js

## Determine what to build on which matrix lane
## ============================================

if [[ "$TRAVIS_BRANCH" == "master" ]]; then

  # Find last successfully built android and ios commits
  LAST_ANDROID=$(git log --grep='\[travis-android\]' -1 | grep -o -E -e "[0-9a-f]{40}")
  LAST_IOS=$(git log --grep='\[travis-ios\]' -1 | grep -o -E -e "[0-9a-f]{40}")

  if [[ "$LAST_ANDROID" == "" ]]; then
    LAST_ANDROID=$(git log --max-parents=0 HEAD | grep -o -E -e "[0-9a-f]{40}")
  fi

  if [[ "$LAST_IOS" == "" ]]; then
    LAST_IOS=$(git log --max-parents=0 HEAD | grep -o -E -e "[0-9a-f]{40}")
  fi

  # Get list of files changed since last successful builds
  TRIGGER_ANDROID=$(git rev-list $LAST_ANDROID..$TRAVIS_COMMIT | xargs -L1 git diff-tree --no-commit-id --name-only -r | grep "^android")
  TRIGGER_IOS=$(git rev-list $LAST_IOS..$TRAVIS_COMMIT | xargs -L1 git diff-tree --no-commit-id --name-only -r | grep "^ios")
  
  # Get list of commit messages including [BUILD] since last successful build
  TRIGGER_ANDROID_BUILD="$(git rev-list $LAST_ANDROID..$TRAVIS_COMMIT | xargs -L1 git rev-list --format=%B --max-count=1 | grep "\[BUILD\( ANDROID\)\?\]")"
  TRIGGER_IOS_BUILD="$(git rev-list $LAST_IOS..$TRAVIS_COMMIT | xargs -L1 git rev-list --format=%B --max-count=1 | grep "\[BUILD\( IOS\)\?\]")"

  if [[ "$TRIGGER_ANDROID" != "" ]]; then
    TRAVIS_BUILD_ANDROID=1
  fi

  if [[ "$TRIGGER_IOS" != "" ]]; then
    TRAVIS_BUILD_IOS=1
  fi

  if [[ "$TRIGGER_ANDROID_BUILD" != "" ]]; then
    TRAVIS_BUILD_ANDROID=1
  fi

  if [[ "$TRIGGER_IOS_BUILD" != "" ]]; then
    TRAVIS_BUILD_IOS=1
  fi
fi

## Install dependencies
## ====================

if [[ "$LANE" == "android" && "$TRAVIS_BUILD_ANDROID" == "0" ]]; then
  TRAVIS_FINISHED=1
fi

if [[ "$LANE" == "ios" && "$TRAVIS_BUILD_IOS" == "0" ]]; then
  TRAVIS_FINISHED=1
fi

if [[ "$TRAVIS_FINISHED" == "0" ]]; then

    node --version
    npm install -g yarn react-native-cli
    curl -sL https://sentry.io/get-cli/ | bash
    gem install fastlane --no-rdoc --no-ri --no-document --quiet
    yarn install

    if [[ "$LANE" == "ios" ]]; then
        (cd ios; pod install --repo-update; cd -)
    fi

fi

export TRAVIS_BUILD_ANDROID=$TRAVIS_BUILD_ANDROID
export TRAVIS_BUILD_IOS=$TRAVIS_BUILD_IOS
export TRAVIS_FINISHED=$TRAVIS_FINISHED