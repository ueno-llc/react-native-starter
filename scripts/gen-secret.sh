# Pack files
SECRETS=()
FILES=(
    "ios/sentry.properties"
    "ios/react-native-starter/GoogleService-Info.plist"
    "android/sentry.properties"
    "android/app/playstore.json"
    "android/app/google-services.json"
    "android/keystores/release.keystore"
)

for file in "${FILES[@]}"
do
    SECRETS+="$(echo "$file" | base64):"
    if [ -f $file ]; then
        CONTENT=$(cat "$file" | base64)
        SECRETS+=$CONTENT
    fi
    SECRETS+=","
done

echo ${SECRETS::-1}