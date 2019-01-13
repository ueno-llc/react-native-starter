# CSS Preprocessors

At Ueno. we love using `SCSS`, that's why it's our default choice for both web and mobile projects. Even though you can use another preprocessor if you want.

!> One important thing. You have to use `const s = require('./Style.scss');` to make the hot/live-reload and css variables work.

## CSS

If you want to do use CSS:

1. Remove `node-sass` from `package.json`
2. Import file like `import s from './Style.scss';`

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
