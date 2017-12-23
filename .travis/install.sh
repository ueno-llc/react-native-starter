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
for KEY in $(cat .env_example | sed 's/\"/\\\"/g' | sed -n 's|\(.*\)=\(.*\)|\1|p'); do
  echo "$KEY=$(printf '%s\n' "${!KEY}")" >> .env
done

# Generate secret files
if [ ! -z "$MATCH_PASSWORD" ]; then
  echo "[Environment] Generating secret files"
  echo $MATCH_PASSWORD | gpg --passphrase-fd 0 .travis/secrets.zip.gpg
  unzip .travis/secrets.zip -d ./

  # Setup ssh-agent for GitHub pushes
  # This is only for public repositories with no write-access.
  git config user.name "Travis CI"
  git config user.email "travis@travis-ci.org"
  eval `ssh-agent -s`
  ssh-add .travis/id_rsa
  REPO=`git config remote.origin.url`
  git remote set-url origin ${REPO/https:\/\/github.com\//git@github.com:}
  git fetch
fi

if [[ "$TRAVIS_FINISHED" == "0" ]]; then

  echo "Node version: $(node --version)"
  npm install -g yarn react-native-cli
  gem install fastlane --no-rdoc --no-ri --no-document --quiet
  yarn install

  if [[ "$LANE" == "ios" ]]; then
    (cd ios; pod install --repo-update; cd -)
  fi

fi