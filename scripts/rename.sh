NAME=$1
ID=$2
PATH=$(echo $ID | sed -e 's/\./\//g')

git checkout -b feature/rename
./node_modules/.bin/react-native-rename "$NAME" -b "$ID"
mv android/app/src/androidTest/java/com/ueno/reactnativestarter "android/app/src/androidTest/java/$PATH"

# Some stuff
FILES=(
  "android/app/src/androidTest/java/$PATH/DetoxTest.java"
  "android/app/proguard-rules.pro"
  "android/fastlane/Appfile"
  "ios/fastlane/Appfile"
  "ios/fastlane/Fastfile"
  "ios/fastlane/Deliverfile"
  "ios/fastlane/Matchfile"
  "scripts/gen-secrets.sh"
  "scripts/build-env.sh"
  "package.json"
)

for file in "${FILES[@]}"
do
    if [ -f $file ]; then
        echo "Patching $file"
        /usr/bin/perl -pi -e "s/com.ueno.reactnativestarter/$ID/g" $file
        /usr/bin/perl -pi -e "s/react-native-starter/$NAME/g" $file
    fi
done
