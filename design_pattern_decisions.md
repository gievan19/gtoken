<h3>Design Patterns used in this project</h3>

<h4>Restricting Access</h4>
This project uses a built-in KYC to only allow whitelisted address to transact, (ie. buy tokens). <br/>
This is implemented at GieTokenSale _preValidatePurchase function that is inherited from the Crowdsale smart contract from OpenZeppelin.<br/>
This function prevalidates the buyer address and would through an error if the KYC is not whitelisted.  

 
