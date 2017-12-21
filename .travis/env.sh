TRAVIS_BUILD_ANDROID=0
TRAVIS_BUILD_IOS=0
TRAVIS_FINISHED=0

## Determine what to build on which matrix lane
## ============================================

# if [[ "$TRAVIS_BRANCH" == "master" ]]; then

  # Find last successfully built android and ios commits
  LAST_ANDROID=$(git log --grep='\[travis-android\]' -1 | grep -o -E -e "[0-9a-f]{40}")
  LAST_IOS=$(git log --grep='\[travis-ios\]' -1 | grep -o -E -e "[0-9a-f]{40}")

  if [[ "$LAST_ANDROID" == "" ]]; then
    echo "Warning: No previous [Android] built on travis"
    LAST_ANDROID=$(git log --max-parents=0 HEAD | grep -o -E -e "[0-9a-f]{40}")
  fi

  if [[ "$LAST_IOS" == "" ]]; then
    echo "Warning: No previous [iOS] built on travis"
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
# fi

## Install dependencies
## ====================

if [[ "$LANE" == "android" && "$TRAVIS_BUILD_ANDROID" == "0" ]]; then
  TRAVIS_FINISHED=1
fi

if [[ "$LANE" == "ios" && "$TRAVIS_BUILD_IOS" == "0" ]]; then
  TRAVIS_FINISHED=1
fi

echo "=== Environment checks ==="
echo "[Android] Last android build: $LAST_ANDROID"
echo "[Android] Changes in ./android since last build"
echo "$TRIGGER_ANDROID" | while read line; do echo "[Android] - $line"; done
echo "[Android] Commit messages that forced a build"
echo "$TRIGGER_ANDROID_BUILD" | while read line; do echo "[Android] - $line"; done
echo "[iOS] Last ios build: $LAST_IOS"
echo "[iOS] Changes in ./ios since last build"
echo "$TRIGGER_IOS" | while read line; do echo "[iOS] - $line"; done
echo "[iOS] Commit messages that forced a build"
echo "$TRIGGER_IOS_BUILD" | while read line; do echo "[iOS] - $line"; done
echo "[Environment] Lane: $LANE"
echo "[Environment] TRAVIS_BUILD_ANDROID: $TRAVIS_BUILD_ANDROID"
echo "[Environment] TRAVIS_BUILD_IOS: $TRAVIS_BUILD_IOS"
echo "[Environment] TRAVIS_FINISHED: $TRAVIS_FINISHED"

# Generate .env
for KEY in $(cat .env_example | sed 's/\"/\\\"/g' | sed -n 's|\(.*\)=\(.*\)|\1|p'); do
  echo "$KEY=$(printf '%s\n' "${!KEY}")" >> .env
done