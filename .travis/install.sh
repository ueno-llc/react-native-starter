source "$(dirname "$0")/env.sh"

# Set config env
echo "export default {};" > src/config.env.js

if [[ "$TRAVIS_FINISHED" == "0" ]]; then

  echo "Node version: $(node --version)"
  npm install -g yarn react-native-cli
  gem install fastlane --no-rdoc --no-ri --no-document --quiet
  yarn install

  if [[ "$LANE" == "ios" ]]; then
    (cd ios; pod install --repo-update; cd -)
  fi

fi