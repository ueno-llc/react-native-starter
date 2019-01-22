#!/bin/bash

libs=(git perl sed iconv tr)
for lib in "${libs[@]}"
do
  if [ "$(which $lib)" == "" ]; then
    echo ""
    echo "Could not find $lib"
    echo "You can try: brew install $lib"
    exit 1
  fi
done

if [ ! -f ./node_modules/.bin/react-native-rename ]; then
  echo ""
  echo "Did you forgot to do install node modules ?"
  echo ""
  echo "  yarn install"
  echo ""
  exit 1
fi

TITLE=$1
NAME=$(echo ${1//[[:blank:]]/} | iconv -t ascii//TRANSLIT | sed -E 's/[^a-zA-Z0-9-]+//g')
ID=$2
REST=$3
IDPATH=$(echo $ID | sed -e 's/\./\//g')
SLUG=$(echo $1 | iconv -t ascii//TRANSLIT | sed -E 's/ /-/g' | sed -E 's/[~\^]+//g' | sed -E 's/[^a-zA-Z0-9-]+//g' | sed -E 's/^-+\|-+$//g' | sed -E 's/\-+/-/g' | tr A-Z a-z)
DIRTY=$(git status --porcelain)

if [[ $REST != *"--no-git"* ]]; then
  if [[ $DIRTY != "" ]]; then
    echo ""
    echo "Git status is dirty. Please stash or commit your changes before proceeding."
    echo ""
  fi

  branch_name=$(git symbolic-ref -q HEAD)
  branch_name=${branch_name##refs/heads/}
  branch_name=${branch_name:-HEAD}

  git checkout -B feature/rename
fi

echo ""
echo "> Renaming the application"
echo ""
echo "  Id: $ID"
echo "  Name: $NAME"
echo "  Slug: $SLUG"
echo ""

# Reset versions
cat android/app/build.gradle | sed -e 's/versionCode .*/versionCode 1/' | sed -e 's/versionName ".*"/versionName "1.0.0"/' > android/app/_build.gradle && mv android/app/_build.gradle android/app/build.gradle
cat ios/react-native-starter/Info.plist | sed -e 's/\([0-9]*\.[0-9]*\.[0-9]*\)/1.0.0/' > ios/react-native-starter/_Info.plist && mv ios/react-native-starter/_Info.plist ios/react-native-starter/Info.plist

RENAME=$(./node_modules/.bin/react-native-rename "$NAME" -b "$ID")
if [[ $RENAME = *"not a valid name"* ]]; then
  echo ""
  echo $RENAME
  echo ""
  exit 1
fi

# Move android test folder
mkdir -p "android/app/src/androidTest/java/$IDPATH"
mv android/app/src/androidTest/java/com/ueno/reactnativestarter/* "android/app/src/androidTest/java/$IDPATH/."
rm -rf android/app/src/androidTest/java/com/ueno/reactnativestarter

# Some stuff
FILES=(
  "android/app/src/main/AndroidManifest.xml"
  "android/app/src/androidTest/java/$IDPATH/DetoxTest.java"
  "android/app/proguard-rules.pro"
  "ios/fastlane/Fastfile"
  "ios/*/Info.plist"
  "ios/*.xcodeproj/project.pbxproj"
  "ios/*.xcodeproj/xcshareddata/xcschemes/*.xcscheme"
  "scripts/build-env.sh"
  "appcenter-pre-build.sh"
  "package.json"
)

for file in "${FILES[@]}"
do
  if [ -f $file ]; then
    echo "> Patching $file"
    perl -pi -e "s/com.ueno.reactnativestarter/$ID/g" $file
    perl -pi -e "s/react-native-starter/$NAME/g" $file
  else
    echo "$file does not match any file(s)."
  fi
done

# Package JSON
perl -pi -e "s/\"name\": \"react-native-starter\",/\"name\"\: \"$SLUG\",/" package.json
perl -pi -e "s/\"version\": \".*\",/\"version\": \"1.0.0\",/" package.json

# src/screens/index.ts
perl -pi -e "s/export const HOME = 'ueno-rns.Home';/export const HOME = '$SLUG.Home';/" src/screens/index.ts
perl -pi -e "s/export const COUNTER = 'ueno-rns.Counter';/export const COUNTER = '$SLUG.Counter';/" src/screens/index.ts

# Info.plist
perl -pi -e "s/React Native Starter/$NAME/" ios/*/Info.plist

# Build environment
source ./scripts/build-env.sh

# Build Cocoapods
echo ""
echo "> Rebuilding pods"
echo ""
rm -rf ./ios/{Pods,Podfile.lock}
cd ios
pod install
cd -

# Cleanup
CLEANUP=(
  "./CHANGELOG.md"
  "./README.md"
  "./LICENSE.md"
  "./docs"
  "./.github"
)

for file in "${CLEANUP[@]}"
do
  rm -r "$file"
done

echo "echo 'Rename script has already been executed.'" > ./scripts/rename.sh
echo "# $TITLE\nSee [react-native-starter docs](https://ueno-llc.github.io/react-native-starter/)\n\n## Development\n\`\`\`bash\nyarn start & react-native run-ios\n\`\`\`" > ./README.md

if [[ $REST != *"--no-git"* ]]; then
  git add .
  git commit -m "App renamed to $NAME ($ID)" --no-verify
  git checkout $branch_name
  git merge feature/rename
  git branch -D feature/rename

  echo ""
  echo "> Successfully renamed app"

  rm -rf ./.git

  git init
  git add .
  git commit -m "Initial commit for React Native Starter" --no-verify
fi
