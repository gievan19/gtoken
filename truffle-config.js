/** 
 * @title This config script is used to define the variables and config settings for deployment
 * @author Evangeline Miclat
 * 
*/

const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Mnemonic = "";
const AccountIndex = 0;

module.exports = {
  /** 
  * @dev used to customize the Truffle configuration
  * @notice See <http://truffleframework.com/docs/advanced/configuration>
  */
  
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
  
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777" // Match any network id
    },
    
    /** 
     * @dev setting HDWallet for Metamask to use the Ganache accounts for testing
     */
 
    ganache_local: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC,"http://127.0.0.1:7545", AccountIndex)
      },
      network_id: 5777
    },
     /** 
     * @dev setting HDWallet for Metamask to use the Goerli accounts for testing
     */
    goerli_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC,"https://goerli.infura.io/v3/21bbe198df2b4fc4938e6e970d51fa1d", AccountIndex)
      },
      network_id: 5
    },
     
    /** 
     * @dev setting HDWallet for Metamask to use the Ropsten accounts for testing
     */
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC,"https://ropsten.infura.io/v3/21bbe198df2b4fc4938e6e970d51fa1d", AccountIndex)
      },
      network_id: 3
    },
    
    /** 
     * @dev setting HDWallet for Metamask to use the Rinkeby accounts for testing
     */ 
    rinkeby_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC,"https://rinkeby.infura.io/v3/21bbe198df2b4fc4938e6e970d51fa1d", AccountIndex)
      },
      network_id: 4
    }
  },
  
  /** 
    * @dev defines the compiler version to be used
    */ 
  compilers: {
    solc: {
      version: "^0.6.0"
    }
  }

};
