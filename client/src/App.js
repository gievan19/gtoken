import React, { Component } from "react";
import GieToken from "./contracts/GieToken.json";
import GieTokenSale from "./contracts/GieTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { loaded:false, kycAddress: "0x123", tokenSaleAddress: null, userTokens:0 };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      // create an instance of the GieToken contract by using the ABI and address from the json file.
      this.tokenInstance = new this.web3.eth.Contract(
        GieToken.abi,
        GieToken.networks[this.networkId] && GieToken.networks[this.networkId].address,
      );

       // create an instance of the GieTokenSale contract by using the ABI and address from the json file.
       this.tokenSaleInstance = new this.web3.eth.Contract(
        GieTokenSale.abi,
        GieTokenSale.networks[this.networkId] && GieTokenSale.networks[this.networkId].address,
      );

       // create an instance of the KycContract by using the ABI and address from the json file.
       this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({loaded:true, tokenSaleAddress: GieTokenSale.networks[this.networkId].address}, this.updateUserTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  //runExample = async () => {
  

    // Stores a given value, 5 by default.
  //  await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
  //  const response = await contract.methods.get().call();

    // Update state with the result.
  //  this.setState({ storageValue: response });
//  };
updateUserTokens = async () => {
  let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
  this.setState({userTokens: userTokens});
}

// listens to the ERC20/IERC20 Transfer event which is emitted whenever our Token fires
// this will be used to update the number of tokens that the user has after purchase
listenToTokenTransfer = () => {
  this.tokenInstance.events.Transfer({to: this.accounts[0]}).on("data", this.updateUserTokens);
}

handleBuyTokens = async() => {
  await this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: this.web3.utils.toWei("1","wei")});
}

handleInputChange = (event) => {
  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  const name = target.name;
  this.setState({
    [name]: value
  });
}

handleKycWhitelisting = async () => {
  await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
  alert("KYC for "+this.state.kycAddress+" is completed.");
}

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Gievan (GIE) Token Sale!</h1>
        <p>Get your Tokens Now!</p>

        <h2>KYC Whitelisting</h2>
        <h3>Allow this Address to Buy Tokens: </h3> <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleKycWhitelisting}>Add to Whitelist</button> <br/>
        <br/>
        <h2>Buy GIE Tokens</h2>
        <h3>To Buy GIE Tokens - Send WEI to this address: </h3> <b>{this.state.tokenSaleAddress}</b>
      
    <p>You currently have: <b>{this.state.userTokens}</b> GIE Tokens</p>
      <button type = "button" onClick={this.handleBuyTokens}>Buy more GIE Tokens</button>
      </div>
    );
  }
}

export default App;
