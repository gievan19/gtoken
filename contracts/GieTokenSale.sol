pragma solidity >=0.6.1 <=0.7.0;
///"SPDX-License-Identifier: MIT"
/**
* @title This contract is used to handle the Token Sale implementation
* @author Evangeline Miclat
* @notice For this project the GIE tokens will be pre-minted. The tokens will be stored to this contract's  once its created.
* @dev All function calls are currently implemented without side effects
*/
import "./Crowdsale.sol";
import "./KycContract.sol";

contract GieTokenSale is Crowdsale {
    /// @dev This contract will use the GIE token symbol
    KycContract kyc;

    constructor(
       
        uint256 rate, 
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    )
   
    Crowdsale(rate, wallet, token) public
    {
        kyc = _kyc;
    }
    
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        /**
        * @notice This is the function to check the user's wallet is allowed to transact. Circuit breaker used for this project is to only allow whitelisted address to perform transactions.
        * @param rate is used  in TKNbits
        * @dev if the address is not whitelisted, it will throw an error.
        */
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(beneficiary), "KYC Not completed yet, aborting..");
    }
}