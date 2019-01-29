./scripts/build-env.sh

# Pod install
if [ -z "$TRAVIS" ]; then
  (cd ios; pod install; cd -)
fi
