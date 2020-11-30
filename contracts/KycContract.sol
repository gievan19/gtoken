/** 
 * @title This contract will pre-qualify the address with KYC checks before transacting
 * @author Evangeline Miclat
 * @notice This smart contract is used to implement OpenZeppelin's Ownable.sol contract
*/
pragma solidity >=0.6.1 <=0.7.0;
/// "SPDX-License-Identifier: MIT"

import "@openzeppelin/contracts/ownership/Ownable.sol";

/** 
 * @dev inherits Ownable contract to allow the owner to set the KYC
*/
contract KycContract is Ownable {
    mapping (address => bool ) allowed;

    function setKycCompleted(address _addr) public onlyOwner {
        /** 
         * @dev Sets the address for KYC
         * @param address for KYC check
         */

        allowed[_addr] = true;
    }

    function setKycRevoked(address _addr) public onlyOwner {
        /** 
         * @dev Sets the address for KYC if revoked
         * @param address for KYC check
         */
        allowed[_addr] = false;
    }

    function kycCompleted(address _addr) public view returns(bool) {
        /** 
         * @dev Sets the address for KYC check
         * @param address
         * @return if address is allowed or not
         */
        return allowed[_addr];
    }
}