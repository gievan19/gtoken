/** 
 * @title This contract is used for Migration
 * @author Evangeline Miclat
 * 
*/

/// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <=0.7.0;

contract Migrations {
  address public owner;
  uint public last_completed_migration;

  modifier restricted() {
    if (msg.sender == owner) _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
