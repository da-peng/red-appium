"use strict"

import wd from "wd"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import colors from "colors"


chai.use(chaiAsPromised);
// https://www.chaijs.com/api/assert/

let should = chai.should()
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

export default should