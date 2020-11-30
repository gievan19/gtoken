/** 
 * @title This unit test script will be used to initialize variables used in the unit test scripts
 * @author Evangeline Miclat
 * @notice Create unit tests using mocha, chai, chai-expect, chai-as-promised
*/

"use strict";

var chai = require("chai");

const BN = web3.utils.BN;

/** 
 * @dev derived chai implementation from openzeppelin-test-helpers/src/setup.js
*/
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
module.exports = chai;