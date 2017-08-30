JSON="export default {$(cat .env | sed 's/\"/\\\"/g' | sed -n 's|\(.*\)=\(.*\)|"\1":"\2",|p') \"generated\": true }"
echo "Generating dotenv"
echo $JSON > ./src/config.env.js
