# Pack files
FILES=(
    ".travis/deployment_key"
    "ios/sentry.properties"
    "ios/react-native-starter/GoogleService-Info.plist"
    "android/keystores/release.keystore"
    "android/sentry.properties"
    "android/playstore.json"
    "android/app/google-services.json"
)

for file in "${FILES[@]}"
do
    if [ -f $file ]; then
        FILES_TO_ADD="$FILES_TO_ADD $file"
    fi
done

tar cvf .travis/secrets.tar $FILES_TO_ADD

# Run this command in terminal after loggin in
#
# `travis encrypt-file .travis/secrets.tar`