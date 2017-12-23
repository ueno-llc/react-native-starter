# Pack files
FILES=(
    "ios/sentry.properties"
    "ios/react-native-starter/GoogleService-Info.plist"
    "android/keystores/release.keystore"
    "android/sentry.properties"
    "android/app/playstore.json"
    "android/app/google-services.json"
)

for file in "${FILES[@]}"
do
    if [ -f $file ]; then
        FILES_TO_ZIP="$FILES_TO_ZIP $file"
    fi
done

zip -r - $FILES_TO_ZIP | base64