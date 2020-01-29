/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

@import Firebase;

#import "AppDelegate.h"
#import "ReactNativeNavigation.h"

#import <CodePush/CodePush.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#if DEBUG
#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
#import <flipper-plugin-react-native-performance/FlipperReactPerformancePlugin.h>
#endif
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [self initializeFlipper:application];
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  if ([[NSDictionary dictionaryWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist"]] objectForKey:@"GOOGLE_APP_ID"]) {
    NSLog(@"Firebase initialized");
  } else {
    NSLog(@"Warning: Invalid GoogleService-Info.plist. Get one from the Firebase Console.");
  }

  NSURL *jsCodeLocation = [self sourceURLForBridge:[ReactNativeNavigation getBridge]];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  #if DEBUG
  #ifdef FB_SONARKIT_ENABLED
  [[FlipperReactPerformancePlugin sharedInstance] setBridge:[ReactNativeNavigation getBridge]];
  #endif
  #endif
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  //   // jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  #if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"src/index.ts" fallbackResource:nil];
  #else
    return [CodePush bundleURL];
  #endif
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
  return [RCTLinkingManager application:application openURL:url
                      sourceApplication:sourceApplication annotation:annotation];
}

- (void) initializeFlipper:(UIApplication *)application {
  #if DEBUG
  #ifdef FB_SONARKIT_ENABLED
    FlipperClient *client = [FlipperClient sharedClient];
    SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
    [client addPlugin: [FlipperReactPerformancePlugin sharedInstance]];
    [client addPlugin: [[FlipperKitLayoutPlugin alloc] initWithRootNode: application withDescriptorMapper: layoutDescriptorMapper]];
    [client addPlugin: [[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
    [client addPlugin: [FlipperKitReactPlugin new]];
    [client addPlugin: [[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
    [client start];
  #endif
  #endif
}

@end
