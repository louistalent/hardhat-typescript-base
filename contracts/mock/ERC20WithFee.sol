pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20MockWithFee is ERC20, Ownable {
    constructor() public ERC20("name", "symbol") {
        _mint(msg.sender, 1000000e18);
    }

    function mint(address addr, uint256 supply) public {
        _mint(addr, supply);
    }

    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal override {
        super._transfer(sender, owner(), (amount * 10) / 100);
        super._transfer(sender, recipient, (amount * 90) / 100);
    }
}
