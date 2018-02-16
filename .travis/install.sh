source "$(dirname "$0")/env.sh"

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
echo "[Environment] Creating .env file"
for KEY in $(cat .env_example | egrep "^[A-Za-z]+" | sed 's/\"/\\\"/g' | sed -n 's|\(.*\)=\(.*\)|\1|p'); do
  echo "$KEY=$(printf '%s\n' "${!KEY}")" >> .env
done

# Display environment
echo "[Environment] .env contents"
cat .env

# Generate secret files
if [ ! -z "$MATCH_PASSWORD" ]; then
  echo "[Environment] Generating secret files"
  gpg --version
  gpg --batch --passphrase $MATCH_PASSWORD --decrypt .travis/secrets.zip.gpg > .travis/secrets.zip
  unzip -o .travis/secrets.zip -d ./
fi

# Build environment
source "scripts/build-env.sh"

if [[ "$TRAVIS_FINISHED" == "0" ]]; then

  echo "Node version: $(node --version)"
  npm install -g yarn react-native-cli
  gem install fastlane --no-rdoc --no-ri --no-document --quiet
  yarn install

  if [[ "$LANE" == "android" ]]; then
    rm -rf node_modules/react-native-ui-lib/node_modules
    ls -al node_modules/react-native-interactable
    rm -rf node_modules/react-native-interactable/\{ios,android\}
    cp -r node_modules/react-native-interactable/lib/ios node_modules/react-native-interactable/ios
    cp -r node_modules/react-native-interactable/lib/android node_modules/react-native-interactable/android
  fi

  if [[ "$LANE" == "ios" ]]; then
    (cd ios; pod install --repo-update; cd -)
  fi

fi
