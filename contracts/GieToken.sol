/** 
 * @title This contract is the base token contract that implements the ERC20 and ERCDetailed smart contracts
 * @author Evangeline Miclat
 * @notice This smart contract is used to implement a new token "GIE" 
 * @dev All function calls are currently implemented without side effects
*/

pragma solidity >=0.6.1 <=0.7.0;
///"SPDX-License-Identifier: MIT"

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract GieToken is ERC20, ERC20Detailed {
    /**
     * @notice This is the Token smart contract that calls the ERC20 smart contract
     * @dev This contract will use the GIE token symbol
    */
   
    constructor(uint256 initialSupply) ERC20Detailed("Gievan Token","GIE",0) public {
         /// @notice This is the Token Contract's constructor that is used to instantiate the object and assign the initial supply
         /// @dev the mint function is used to give the initial tokens supply to the person who created the token


        _mint(msg.sender, initialSupply);
    }
}
