//
//  RNUeno.m
//  react-native-starter
//
//  Created by Birkir Rafn Gudjonsson on 02/01/2018.
//  Copyright © 2018 Ueno. All rights reserved.
//
#import "RNUeno.h"

@implementation RNUeno

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE()

- (NSDictionary *)constantsToExport
{
  BOOL isTestFlight = [[[[NSBundle mainBundle] appStoreReceiptURL] lastPathComponent] isEqualToString:@"sandboxReceipt"];
  return @{
           @"isTestFlight": @(isTestFlight)
           };
}

@end
