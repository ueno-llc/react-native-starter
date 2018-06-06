/* eslint import/no-extraneous-dependencies: 0 */
const upstreamTransformer = require('metro/src/transformer');
const cssTransformer = require('react-native-css-transformer');
const typescriptTransformer = require('react-native-typescript-transformer');

module.exports.transform = ({ src, filename, options }) => {
  if (filename.endsWith('.css')) {
    return cssTransformer.transform({ src, filename, options });
  } else if (filename.endsWith('.ts') || filename.endsWith('.tsx')) {
    return typescriptTransformer.transform({ src, filename, options });
  }
  return upstreamTransformer.transform({ src, filename, options });
};
