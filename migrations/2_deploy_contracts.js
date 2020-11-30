/** 
 * @title This script is used to call the GieToken, GieTokenSale and KycContract contracts
 * @notice This script is called after the initial migration script
 * @dev This will deploy the Token contract, Token Sale and the KYC contract
*/

var GieToken = artifacts.require("GieToken");
var GieTokenSale = artifacts.require("GieTokenSale");
var GieKycContract = artifacts.require("KycContract"); 

require("dotenv").config({path: "../.env"});
//console.log(process.env);

/** 
 * @dev defines the functions that will be deployed by the deployer
*/
module.exports = async function (deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(GieToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(GieKycContract);
    await deployer.deploy(GieTokenSale, 1, addr[0], GieToken.address,GieKycContract.address);
    let instance = await GieToken.deployed();
    await instance.transfer(GieTokenSale.address, process.env.INITIAL_TOKENS);
}