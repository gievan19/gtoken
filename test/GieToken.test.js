/** 
 * @title This unit test script will be used to test the GieToken smart contract.
 * @author Evangeline Miclat
 * @notice Create unit tests using mocha, chai, chai-expect, chai-as-promised
*/
const Token = artifacts.require("GieToken");

/** 
 * @notice gets the common test variables used at chaisetup.js
*/
const chai = require("./setupchai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

require("dotenv").config({path: "../.env"});

contract("GieToken Test", async (accounts) => {
/** 
 * @notice 
 * 1. all tokens should be in the owner account
 * 2. tokens could be sent in between accounts
 * 3. tokens cannot be sent if its more than the available tokens
 * @dev All function calls are currently implemented without side effects
 * 
 */

    const [deployerAccount, recipient, anotherAccount] =  accounts;
     
    /** 
     * @dev this hook is called before unit test cases are ran 
     */

    beforeEach(async () => {
        this.gieToken = await Token.new(process.env.INITIAL_TOKENS);
    })

    it("all tokens should be in the owner account", async () => {
        /** 
         * @notice Check that all tokens from the deployer account is sent to the owner account
         * @dev uses chai assertions as promised should/expect test documentation from openzeppelin
         * @return assertion that balance of deployerAccount equals to totalSupply
         */
        let instance = this.gieToken;
        let totalSupply = await instance.totalSupply();
        
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is possible to send tokens between accounts", async() => {
        /** 
         * @notice Check that tokens can be successfully transferred between pre-qualified accounts
         * @dev send 1 token account from deployer account to the recipient and check if the balance changed.
         * @return assertion that balance tokens were sent succesfully 
         */

        const sendTokens = 1;
        let instance = this.gieToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
       
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("is not possible to send more tokens than available in total", async () => {
        /** 
         * @notice Check that tokens sent should not be greater that total number of tokens
         * @dev uses chai assertions as promised should/expect test documentation from openzeppelin
         * @return assertion that balance tokens does not exceed tokens being sent
         */
        let instance = this.gieToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        expect(instance.transfer(recipient,new BN(balanceOfDeployer+1))).to.eventually.be.rejected;
       
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });
});

