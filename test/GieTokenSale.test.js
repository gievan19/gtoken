/** 
 * @title This unit test script will be used to test the GieTokenSale smart contract.
 * @author Evangeline Miclat
 * @notice Create unit tests using mocha, chai, chai-expect, chai-as-promised
*/
const TokenSale = artifacts.require("GieTokenSale");
const Token = artifacts.require("GieToken");
const KycContract = artifacts.require("KycContract");

/** 
 * @notice gets the common test variables used at chaisetup.js, implementation was taken from openzeppelin tests
*/
const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

/** 
 * @notice the Contract will test these 3 scenarios:
 * 1. the contrat should not have any tokens in the deployerAccount
 * 2. tokens should be in TokenSale initially by default
 * 3. test that tokens can be bought by whitelisted accounts
 * @dev All function calls are currently implemented without side effects
 * 
 */
contract("GieTokenSale Test", async (accounts) => {

    const [deployerAccount, recipient, anotherAccount] =  accounts;

    it ("should not have any tokens in the deployerAccount" , async() => {
         /** 
         * @notice Check the deployerAccount dont have any tokens initially before creation
         * @dev Get an instance of the contract by calling Contract.deployed()
         * @return assertion that balance of deployerAccount equals to 0
         */

        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it ("all tokens should be in the TokenSale Smart Contract by default", async () => {
         /** 
         * @notice Check that there are tokens available in the GieTokeSale smart contract
         * @dev uses expect from chai-expect
         * @return assertion that balance of GieTokenSale equals to totalSupply
         */
        let instance = await Token.deployed();
        let balanceOfTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();
        
        return expect(balanceOfTokenSaleSmartContract).to.be.a.bignumber.equal(totalSupply);
    })

    it ("should be possible to buy tokens", async () => {
         /** 
         * @notice Check that tokens can be bought successfully for pre-qualified address
         * @dev transfer 1 token to test
         * @return assertion that balance after test transfer is equal to 1
         */
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        
        /** 
         * @dev whitelist address for KYC
         */
        let kycInstance = await KycContract.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        await kycInstance.setKycCompleted(deployerAccount,{from: deployerAccount});

        expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    })
});