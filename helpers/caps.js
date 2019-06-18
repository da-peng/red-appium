"use strict"

let android21 = {
    platformName: 'Android',
    platformVersion: '5.0',
    deviceName: 'Android Emulator',
    automationName:'UiAutomator2',
    appPackage: "com.xingin.xhs",
    // appActivity: "com.xingin.xhs.activity.SplashActivity"
}

let android23 = {
    platformName: 'Android',
    platformVersion: '6.0',
    deviceName: 'Android Emulator',
    automationName:'UiAutomator2',
    appPackage: "com.xingin.xhs",
    dontStopAppOnReset:true,
    noReset:true,
    appActivity: "com.xingin.xhs.index.IndexNewActivity",
    
}

module.exports ={
    android21,
    android23
}