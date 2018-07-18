const upstreamTransformer = require('metro/src/reactNativeTransformer');
const typescriptTransformer = require('react-native-typescript-transformer');
const cssTransformer = require('react-native-css-transformer');
// const stylusTransformer = require('react-native-stylus-transformer');
// const sassTransformer = require('react-native-sass-transformer');
// const lessTransformer = require('react-native-less-transformer')

module.exports.transform = ({ src, filename, options }) => {

  if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
    return typescriptTransformer.transform({ src, filename, options });
  }

  if (filename.endsWith('.css')) {
    return cssTransformer.transform({ src, filename, options });
  }

  // if (filename.endsWith('.styl')) {
  //   return stylusTransformer.transform({ src, filename, options });
  // }

  // if (filename.endsWith('.scss') || filename.endsWith('.sass')) {
  //   return sassTransformer.transform({ src, filename, options });
  // }

  // if (filename.endsWith('.less')) {
  //   return lessTransformer.transform({ src, filename, options });
  // }

  return upstreamTransformer.transform({ src, filename, options });
};
