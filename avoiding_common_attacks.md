<h3>Security used to Avoid Common Attacks and Dangers</h3>

<h4>1. Integer Overflow and Underflow</h4>
This project uses uint256 integer types (e.g. unint256 initialSupply) - to prevent the integer underflow/overflow while the tokens are passed through for sale between addresses.

<h4>2. ReentrancyGuard
This project uses the Crowdsale solidity contract from OpenZeppelin which implements the ReentrancyGuard and SafeMath.

<h4>3. Restricting Access</h4>
This project uses a built-in KYC to only allow whitelisted address to transact, (ie. buy tokens). <br/>
This is implemented at GieTokenSale _preValidatePurchase function that is inherited from the Crowdsale smart contract from OpenZeppelin.<br/>
This function prevalidates the buyer address and would through an error if the KYC is not whitelisted.

