# Rename the app

It can be really hard to rename react-native apps because of the way they are set up, but we made it easy to rename it with a simple shell script.

### App Name

Choose your app name, it can only contain alphanumeric characters and spaces.

### Bundle identifier

All apps (both iOS and Android) have something called bundle indentifier, that usually consists of company's reversed domain name + product name. So a company or division that has the website hostname of `pantone.example.org` will use the bundle identifier `org.example.pantone.sampleapp` if their app name was `Sample App`.

### Renaming

To rename your app you simply do the following:

```bash
./scripts/rename.sh "Bueno Connect" com.ueno.buenoconnect
```

The script will create a new branch called `feature/rename` and merge it with master once completed. You can skip it by adding `--no-git`.
