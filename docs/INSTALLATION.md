# Installation

## Setup

It is very easy to get started, no environment variables or anything are required to start developing.

```bash
# Clone the repository to your own folder
git clone git@github.com:ueno-llc/react-native-starter.git my-new-app

# Move to the new folder
cd my-new-app

# Install dependencies
yarn install

# Rename the application, Cocoapods will be installed automatically
yarn rename "My New App" co.ueno.mynewapp

# Link the folder to your repository
git remote add origin git@github.com:username/new_repo

# Yarn start
yarn start

# Start developing!
react-native run-ios
```

Alternatively you can use `create-ueno-app`:

```bash
yarn create ueno-app native my-new-app co.ueno.mynewapp
```

More details available [here](https://github.com/ueno-llc/create-ueno-app#native)

?> When choosing your app name `My New App`, you can only use alphanumeric characters and spaces. The bundle indentifier: `co.ueno.mynewapp` is usually the company's reversed domain name + product name.

!> Don't forget to run the `yarn rename` command otherwise the React Native Starter won't be fully set up.

## Usage

Let's create your first screen and start developing!

1. First step is to create a new folder in the `src/screens` folder with the screen name.
2. Then create your component inside the folder (Look at `Home` for reference).
3. Next edit `src/screens/index.ts` and create a new variable for your screen.

#### Sample

Let's add a new screen called `About`

```js
import { Navigation } from 'react-native-navigation';

import Home from './home';
import Counter from './counter';
import About from './about';

export const HOME = 'ueno-rns.Home';
export const COUNTER = 'ueno-rns.Counter';
export const ABOUT = 'ueno-rns.About'; // You can name it anything you want

export const Screens = new Map();

Screens.set(HOME, Home);
Screens.set(COUNTER, Counter);
Screens.set(ABOUT, About); // Map the constant to the module here.

export const startApp = () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'ROOT_STACK',
        children: [{
          component: { name: HOME },
        }],
      },
    },
  });
};
```

?> Feel free to remove or rename the pre-created screens as you want.
