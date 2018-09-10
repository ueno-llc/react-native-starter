import { StyleSheet, Dimensions } from 'react-native';
import { setVar, setTheme, setThemeVars } from 'react-native-ueno-css-modules';
import { Navigation } from 'react-native-navigation';

// Add some static re-usable css variables here
setVar('--hairline-width', StyleSheet.hairlineWidth);

// Add themes here
setTheme('default');

setThemeVars('default', {
  '--primary-color': '#6ea',
  // '--primary-color-ios': 'red',
  // '--primary-color-android': 'blue',
  '--gutter': 16,
});

export async function updateTheme(): Promise<boolean> {
  // Add device width and height
  const { width, height } = Dimensions.get('window'); // tslint:disable-line no-backbone-get-set-outside-model
  setVar('--window-width', width);
  setVar('--window-height', height);

  // Add navigation constants
  const res = await Navigation.constants();
  setVar('--bottom-tabs-height', res.bottomTabsHeight);
  setVar('--status-bar-height', res.statusBarHeight);
  setVar('--top-bar-height', res.topBarHeight);

  // Add dynamic variables here
  // ...

  return true;
}
