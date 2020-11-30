# gtoken
<h2>This repository contains the GIE Token code base </h2>

<b>This project is called GIE Token</b>

<b>It is an asset tokenization which uses OpenZeppelin contracts, Truffle and React.</b>

<h3>Implementation of the project</h3>

1. The project is implemented by using an ERC-20
2. Token smart contract which was imported through OpenZeppelin
3. This smart contract is deployed through either Ganache or Test-Net through Infura.
4. The project uses a UI which utilizes HTML through Auto-React. It also uses MetaMask.
5. This ERC 20 smart contract uses an initial value of tokens available, defined through a config file. 
6. The initial supply of tokens are assigned to the owner of the smart contract.
7. There is also a Crowdsale contract where people can buy these tokens.
8. Upon deployment of the contract the initial tokens are immediately assigned to the owner.
9. Then the tokens are shifted to the Crowdsale Contract. 
10. The Crowdsale Contract takes care of selling the tokens to people.
 
<h3>Buy token use case:</h3>
1. Before a buyer can buy a token, its address (through the Metamask) needs to be whitelisted.
2. After the address is whitelisted, it needs to transfer some funds, e.g. (WEI) into Smart Contract’s address provided.
3. Once the transfer is successful, the equivalent value of GIE tokens are transferred to the buyer’s address. 
4. The UI will display the GIE token balance which will include the purchased tokens.
 
<h3>How to pre-qualify buyers?</h3>
Buyers will be qualified through a mock KYC/AML check, wherein for the purpose of this project, 
certain addresses will be whitelisted to perform transactions.
So before a buyer can buy a token, the Crowdsale Smart Contract will check if the address is whitelisted.  
If it is then, the token exchange will take place, otherwise there will be an error.

<h3>How is the ERC20 interface implemented on this project?</h3>
<b>I have used the IERC20 Interface for the smart contract to use the following functions from the interface:</b>
1. totalSupply
2. balanceOf
3. transfer
4. allowance
5. approve
6. transferFrom

<b>As well as 2 Events:</b>
1. event Transfer
2. event Approval

<h3>How is the project deployed?</h3>
1. The project is deployed by using a domain in a shared-hosting environment: <b>http://gtoken.gievan.com</b>
    This URL is defined at the package.json, through this variable: 
    "homepage": "http://gtoken.gievan.com",

2. Afterwhich, npm run build command was executed to build the project.

3. Once the project was built, the contents of the /client/build folder was copied over to the shared hosting directory of the this URL ("http://gtoken.gievan.com")

<h3>Limitations of this project:</h3>
It is not audited for Production use.
