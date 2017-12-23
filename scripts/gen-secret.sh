# Pack files
SECRET=()
FILES=(
    "ios/sentry.properties"
    "ios/react-native-starter/GoogleService-Info.plist"
    "android/sentry.properties"
    "android/app/playstore.json"
    "android/app/google-services.json"
)

for file in "${FILES[@]}"
do
    SECRET+="$(echo "$file" | base64):"
    if [ -f $file ]; then
        CONTENT=$(cat "$file" | base64)
        SECRET+=$CONTENT
    fi
    SECRET+=","
done

echo ${SECRET::-1}