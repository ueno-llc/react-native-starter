#!/bin/bash
libs=(git perl sed iconv tr)
for lib in "${libs[@]}"
do
  if [ "$(which $lib)" == "" ]; then
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

NAME=$(echo ${1//[[:blank:]]/} | iconv -t ascii//TRANSLIT | sed -E 's/[^a-zA-Z0-9-]+//g')
ID=$2
REST=$3
IDPATH=$(echo $ID | sed -e 's/\./\//g')
SLUG=$(echo $NAME | iconv -t ascii//TRANSLIT | sed -E 's/ /-/g' | sed -E 's/[~\^]+//g' | sed -E 's/[^a-zA-Z0-9-]+//g' | sed -E 's/^-+\|-+$//g' | sed -E 's/\-+/-/g' | tr A-Z a-z)
DIRTY=$(git status --porcelain)

if [[ $REST != *"--no-git"* ]]; then
  if [[ $DIRTY != "" ]]; then
    echo "Git status is dirty. Please stash or commit your changes before proceeding."
  fi

  branch_name=$(git symbolic-ref -q HEAD)
  branch_name=${branch_name##refs/heads/}
  branch_name=${branch_name:-HEAD}

  git checkout -B feature/rename
fi

# Reset versions
cat android/app/build.gradle | sed -e 's/versionCode .*/versionCode 1/' | sed -e 's/versionName ".*"/versionName "1.0.0"/' > android/app/_build.gradle && mv android/app/_build.gradle android/app/build.gradle
cat ios/react-native-starter/Info.plist | sed -e 's/\([0-9]*\.[0-9]*\.[0-9]*\)/1.0.0/' > ios/react-native-starter/_Info.plist && mv ios/react-native-starter/_Info.plist ios/react-native-starter/Info.plist

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
  "ios/*/Info.plist"
  "ios/*.xcodeproj/project.pbxproj"
  "scripts/gen-secrets.sh"
  "scripts/build-env.sh"
  ".travis/gen-secrets.sh"
  ".travis/build.sh"
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

# Package JSON
perl -pi -e "s/\"name\": \".*\",/\"name\"\: \"$SLUG\",/" package.json
perl -pi -e "s/\"version\": \".*\",/\"version\": \"1.0.0\",/" package.json

if [[ $REST != *"--no-git"* ]]; then
  git add .
  git commit -m "App renamed to $NAME ($ID)" --no-verify
  git checkout $branch_name
  git merge feature/rename
  git branch -D feature/rename
fi

# Build environment
source ./scripts/build-env.sh
