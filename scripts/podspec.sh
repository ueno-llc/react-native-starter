#!/bin/bash
echo "1. Package name? (e.g. BVLinearGradient, it's the .xcodeproj's name)"
read name

echo "2. Github url? (e.g. react-native-community/react-native-linear-gradient)"
read url

echo "3. node_modules's name? (e.g. react-native-linear-gradient)?"
read path

/bin/cat <<EOM >"./node_modules/$path/$name.podspec"
require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "$name"
  s.version      = package['version']

  s.authors      = { "$name" => "$name" }
  s.homepage     = "https://github.com/$url"
  s.license      = package['license']
  s.platform     = :ios, "8.0"

  s.source       = { :git => "https://github.com/$url.git", :tag => "v#{s.version}" }
  s.source_files  = "ios/**/*.{h,m}"
  s.header_mappings_dir = 'ios'
  s.public_header_files = "ios/*.h"

  s.dependency 'React'
end
EOM
