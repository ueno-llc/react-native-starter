//
//  RNUeno.m
//  react-native-starter
//
//  Created by Birkir Rafn Gudjonsson on 02/01/2018.
//  Copyright © 2018 Ueno. All rights reserved.
//
#import "RNUeno.h"

#ifndef TARGET_OS_SIMULATOR
#ifdef TARGET_IPHONE_SIMULATOR
#define TARGET_OS_SIMULATOR TARGET_IPHONE_SIMULATOR
#else
#define TARGET_OS_SIMULATOR 0
#endif
#endif

@implementation RNUeno

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

- (BOOL) isSimulator {
#if TARGET_OS_SIMULATOR
  return YES;
#else
  return NO;
#endif
}

- (BOOL) isAppStoreReceiptSandbox {
  if (![NSBundle.mainBundle respondsToSelector:@selector(appStoreReceiptURL)]) {
    return NO;
  }
  NSURL *appStoreReceiptURL = NSBundle.mainBundle.appStoreReceiptURL;
  NSString *appStoreReceiptLastComponent = appStoreReceiptURL.lastPathComponent;
  BOOL isSandboxReceipt = [appStoreReceiptLastComponent isEqualToString:@"sandboxReceipt"];
  return isSandboxReceipt;
}

- (BOOL) hasEmbeddedMobileProvision {
  BOOL hasEmbeddedMobileProvision = !![[NSBundle mainBundle] pathForResource:@"embedded" ofType:@"mobileprovision"];
  return hasEmbeddedMobileProvision;
}

- (NSDictionary *)constantsToExport
{
  BOOL isSimulator = [self isSimulator];
  BOOL isTestFlight = [self isAppStoreReceiptSandbox];
  BOOL hasMobileProvision = [self hasEmbeddedMobileProvision];
  return @{
           @"isSimulator": @(isSimulator),
           @"isTestFlight": @(isTestFlight),
           @"hasMobileProvision": @(hasMobileProvision)
           };
}

@end
