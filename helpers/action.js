"use strict"

import wd from "wd"
import Q from "q"

let swipe = async(opts,driver) => {
  let action = new wd.TouchAction(driver);
  action
    .press({ x: opts.startX, y: opts.startY })
    .wait(opts.duration)
    .moveTo({ x: opts.endX, y: opts.endY })
    .release().perform();
}

let sigleTap = async(opts,driver) => {
  let action = new wd.TouchAction(driver);
  action
    .press({ x: opts.startX, y: opts.startY })
    .wait(opts.duration)
    .moveTo({ x: opts.endX, y: opts.endY })
    .release().perform();
}

module.exports ={
  swipe
} 


