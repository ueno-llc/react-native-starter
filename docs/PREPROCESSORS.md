# CSS Preprocessors

By default, React Native Starter works only with `.css`. It's already a really good feature to be able to write CSS and behind the scene compile it to React Native Stylesheet. But you can use one of theses preprocessors if you want.

!> One important thing to remind. You have to use `const s = require('./Style.css');` to make it works. Using `import` will break the hot/live-reload and you won't be able to use the variables defined in `theme.ts`.

## SCSS

If you want to do use SCSS, like Ueno, because we are cool:

1. Open `metro.config.js` and add to `sourceExts`'s array: `.scss`
2. Then you need sass `yarn add node-sass -ED`
3. You can now do `const s = require('./Style.scss');`

## Stylus

If you want to use Stylus:

1. Open `metro.config.js` and add to `sourceExts`'s array: `.styl`
2. Then you need stylus `yarn add stylus -ED`
3. You can now do `const s = require('./Style.styl');`

## LESS

If you want to use LESS:

1. Open `metro.config.js` and add to `sourceExts`'s array: `.less`
2. Then you need stylus `yarn add less -ED`
3. You can now do `const s = require('./Style.less');`
