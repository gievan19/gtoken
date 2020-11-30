# gtoken
<h2>This repository contains the GIE Token code base </h2>

<b>This project is called GIE Token</b>

<b>It is an asset tokenization which uses OpenZeppelin contracts, Truffle and React.</b>

<h3>Implementation of the project</h3>

1. The project is implemented by using an ERC-20 token smart contract which was imported through OpenZeppelin.
3. This smart contract is deployed initially using Ganache to write and test unit test cases, then Rinkeby Test-Net through Infura.
4. The project uses a UI which utilizes HTML by unboxing Auto-React from Truffle. It also uses MetaMask.
5. This ERC-20 smart contract uses an initial value of pre-minted tokens, defined through a config file. 
6. The initial supply of these pre-minted tokens are assigned to the owner of the smart contract.
7. There is also a Crowdsale contract where people can buy these tokens.
8. Upon deployment of the contract the initial tokens are immediately assigned to the owner.
9. Then the tokens are shifted to the Crowdsale Contract. 
10. The Crowdsale Contract takes care of selling the tokens to people.
 
<h3>Buy token use case:</h3>
1. Before a buyer can buy a token, its address (through the Metamask) needs to be whitelisted.<br/>
2. After the address is whitelisted, it needs to transfer some funds, e.g. (WEI) into Smart Contract’s address provided.<br/>
3. Once the transfer is successful, the equivalent value of GIE tokens are transferred to the buyer’s address. <br/>
4. The UI will display the GIE token balance which will include the purchased tokens.<br/>
 
<h3>How to pre-qualify buyers?</h3>
Buyers will be qualified through a mock KYC/AML check. <br/>
For the purpose of this project, certain addresses will be whitelisted to perform transactions. <br/>
So before a buyer can buy a token, the Crowdsale Smart Contract will check if the address is whitelisted.<br/>
If it is then, the token exchange will take place, otherwise there will be an error.<br/>

<h3>How is the ERC20 interface implemented on this project?</h3>
<b>I have used the IERC20 Interface for the smart contract to use the following functions from the interface:</b>
1. totalSupply<br/>
2. balanceOf<br/>
3. transfer<br/>
4. allowance<br/>
5. approve<br/>
6. transferFrom<br/>

<b>As well as 2 Events:</b>
1. event Transfer<br/>
2. event Approval<br/>

<h3>How is the project deployed?</h3>
1. The project is deployed by using a domain in a shared-hosting environment: <b>http://gtoken.gievan.com</b><br/>
    This URL is defined at the package.json, through this variable: 
    "homepage": "http://gtoken.gievan.com" <br/>

2. Afterwhich, npm run build command was executed to build the project.<br/>

3. Once the project was built, the contents of the /client/build folder was copied over to the shared hosting directory of the this URL:<br/> ("http://gtoken.gievan.com")<br/> 

<h3>Plans for Future Versions:</h3>
1. Use Mintable Tokens instead of pre-minted tokens. <br/> 
2. Improve UI look and feel and design<br/> 

<h3>Limitations of this project:</h3>
It is not audited for Production use.

