#!/bin/bash
NAME=$1
ID=$2
REST=$3
IDPATH=$(echo $ID | sed -e 's/\./\//g')
SLUG=$(echo $NAME | iconv -t ascii//TRANSLIT | sed -E 's/ /-/g' | sed -E 's/[~\^]+//g' | sed -E 's/[^a-zA-Z0-9-]+//g' | sed -E 's/^-+\|-+$//g' | sed -E 's/\-+/-/g' | tr A-Z a-z)
DIRTY=$(git status --porcelain)

if [[ $REST != *"--no-git"* ]]; then
  if [[ $DIRTY != "" ]]; then
    echo "Git status is dirty. Please stash or commit your changes before proceeding."
  fi

  git checkout -B feature/rename
fi

RENAME=$(./node_modules/.bin/react-native-rename "$NAME" -b "$ID")
if [[ $RENAME = *"not a valid name"* ]]; then
  echo $RENAME
  exit 1
fi

mv android/app/src/androidTest/java/com/ueno/reactnativestarter "android/app/src/androidTest/java/$IDPATH"

# Some stuff
FILES=(
  "android/app/src/androidTest/java/$IDPATH/DetoxTest.java"
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
        perl -pi -e "s/com.ueno.reactnativestarter/$ID/g" $file
        perl -pi -e "s/react-native-starter/$NAME/g" $file
    fi
done

perl -pi -e "s/\"name\".*/\"name\"\: \"$SLUG\",/" package.json

if [[ $REST != *"--no-git"* ]]; then
  git add .
  git commit -m "App renamed to $NAME ($ID)" --no-verify
  git checkout master
  git merge feature/rename
fi
