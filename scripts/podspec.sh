#!/bin/bash
echo "1. Package's name? (e.g. react-native-linear-gradient)"
read package

echo "2. Module's name? (e.g. BVLinearGradient, .xcodeproj's name)"
read module

echo "3. Github's url? (e.g. react-native-community/react-native-linear-gradient)"
read url

IFS='/' read -r -a author <<< "$url"

/bin/cat <<EOM >"./node_modules/$package/$package.podspec"
require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "$package"
  s.version      = package['version']
  s.summary      = "$package's podspec"

  s.authors      = { "${author[0]}" => "${author[0]}" }
  s.homepage     = "https://github.com/$url"
  s.license      = package['license']
  s.platform     = :ios, "8.0"

  s.module_name  = "$module"

  s.source       = { :git => "https://github.com/$url.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"
  s.header_mappings_dir = 'ios'
  s.public_header_files = "ios/*.h"

  s.dependency 'React'
end
EOM
