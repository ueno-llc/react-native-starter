package com.ueno.reactnativestarter;

import android.content.Context;
import android.app.Application;
import android.util.Log;
import java.util.Arrays;
import java.util.List;
import java.lang.reflect.InvocationTargetException;

// React Native
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.PackageList;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

// React Native Navigation
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;

// Linked Libraries
import com.microsoft.codepush.react.CodePush;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @javax.annotation.Nullable
            @Override
            protected String getJSBundleFile() {
                return CodePush.getJSBundleFile();
            }
            @Override
            protected String getJSMainModuleName() {
                return "src/index";
            }
        };
        ReactGateway gateway = new ReactGateway(this, isDebug(), host);
        initializeFlipper(this, host.getReactInstanceManager());
        return gateway;
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }


    private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
                Class<?> aClass = Class.forName("com.ueno.reactnativestarter.ReactNativeFlipper");
                aClass
                        .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                        .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }

    // Add custom packages here
    protected List<ReactPackage> getPackages() {

        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();
        // Packages that cannot be autolinked yet can be added manually here, for example:
        // packages.add(new MyReactNativePackage());
        packages.add(new CodePush(BuildConfig.ANDROID_CODEPUSH_DEPLOYMENT_KEY, MainApplication.this, BuildConfig.DEBUG));
        return packages;
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}

