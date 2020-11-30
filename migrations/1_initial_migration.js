/** 
 * @title This script is used to call the Migrations.sol
 * @notice This is the initial script called during deployment
 * @dev All function calls are currently implemented without side effects
*/
var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
