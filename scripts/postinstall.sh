./scripts/build-env.sh

# Pod install
if [[ "$OSTYPE" == "darwin"* ]]; then
  if [ -z "$TRAVIS" ]; then
    (cd ios; pod install; cd -)
  fi
fi
