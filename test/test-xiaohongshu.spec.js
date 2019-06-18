"use strict";

import setup from "../helpers/setup"
import logConfig from "../helpers/logging"
import caps from "../helpers/caps"
import wd from "wd"
import _ from "underscore"
import "@babel/polyfill";
import Q from "q";
import actions from '../helpers/action'
import config from '../helpers/appium-server'

wd.addPromiseChainMethod('swipe', actions.swipe); //  增加Promise 同步调用链方法（封装方法）

describe("小红书自动操作", () => {// 测试套件
  let driver
  let allPassed = true


  before(() => {
    let serverConfig = config.local
    driver = wd.promiseChainRemote(serverConfig);
    logConfig(driver);

    let desired = _.clone(caps.android23)
    // lsof -i :4723 | awk {$2} | xargs kill -9 批量删除 占有端口的应用
    //     app: "/apps_apk/com.xingin.xhs_5491036.apk",
    // desired.app = "/apps-apk/com.xingin.xhs_5491036.apk"
    return driver.init(desired);
  })

  after(() => {
    return driver
      .quit()
  })


  it.only("切换首页-关注", async () => {//用例格式，官方例子推荐; 一行 //测试用例
    await driver
      .elementByXPath('//android.widget.TextView[@text=\'关注\']')
      .should.eventually.exist
      .click()
      .getCurrentActivity()
      .sleep(2000)
     for (let index = 0; index < 100; index++) {
      await driver.swipe({
        startX: 500, startY: 400,
        endX: 500, endY: 800,
        duration: 800
      }, driver).sleep(5000)
     }
       
      //   console.log("-------")
      // },800))
      // console.log("=====")

    // setInterval(
    //    () => {
       
    //   }
    //   , 5000)


    // await elemnetToolBar.click()
    // let activity =  await driver.getCurrentActivity();

    // await driver.scroll(10, 100);
  })
  it("首页-发现", async function () {

    try {
      for (let index = 0; index < 20; index++) {
        let els = await driver
          .elementByXPath('//android.view.ViewGroup[@resource-id="com.xingin.xhs:id/aj4"]')// 实现后id不准，Xpath最准
          .should.eventually.exist
          .elementsByXPath('//android.widget.FrameLayout[@resource-id="com.xingin.xhs:id/kq"]')// 这里是elements
        console.log(els)
        await els.click()

        // await driver.tapElement(els[0]);

        // return Q.all([
        //   els[0]
        //   // els[1].getLocation()
        // ]).then((el)=>{
        //   let action = new wd.TouchAction();
        //   action.tap({el: el});
        //   await action.perform();
        // })

        // .back()
        // .elementsByXPath('//android.widget.FrameLayout[@resource-id="com.xingin.xhs:id/kq"]')[1]
        // .click()
        // .back()

        await driver.swipe({
          startX: 0, startY: 1500,
          endX: 0, endY: 100,
          duration: 800
        }, driver)
      }
    } catch (error) {
      console.log(error)
      this.skip()

    }


  })

  it("单列列表滚动", async function () {// 将第一行的内容滚动上去 // only 代表（只有）这个测试用例能够执行
    // this.retries(2);// RETRY TESTS 重复测试（循环）// this不能在箭头删除内使用，只能在未绑定函数使用
    try {
      for (let index = 0; index < 20; index++) {
        await driver
          .elementByXPath('//android.view.ViewGroup[@resource-id="com.xingin.xhs:id/aj4"]')// 实现后id不准，Xpath最准
          .should.eventually.exist
          .elementsByXPath('//android.widget.LinearLayout[@resource-id="com.xingin.xhs:id/aag"]')// 这里是elements
          .should.eventually.exist
          .then((els) => {
            console.log(els.length)
            return Q.all([
              els[2].getLocation(),// 这种方式不行（不准确），只适合于单列列表滚动
              els[0].getLocation()//从下往上拉
            ]).then((locs) => {
              console.log('locs -->', locs);
              return driver.swipe({
                startX: locs[0].x, startY: locs[0].y,
                endX: locs[1].x, endY: locs[1].y,
                duration: 800
              }, driver)

            })
          })
      }
    } catch (error) {
      this.skip()
    }


  })
})
