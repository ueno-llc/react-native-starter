/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "ReactNativeNavigation.h"

#import <CodePush/CodePush.h>
#import <React/RCTLinkingManager.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <RNSentry.h>
#import <Firebase.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [RNSentry installWithBridge:[ReactNativeNavigation getBridge]];

  if ([[NSDictionary dictionaryWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist"]] objectForKey:@"GOOGLE_APP_ID"]) {
    [FIRApp configure];
    NSLog(@"Firebase initialized");
  } else {
    NSLog(@"Warning: Invalid GoogleService-Info.plist. Get one from the Firebase Console.");
  }

  NSURL *jsCodeLocation = [self sourceURLForBridge:[ReactNativeNavigation getBridge]];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];

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

@end
