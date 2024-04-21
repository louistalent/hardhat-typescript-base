import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();
    console.log("deployer", owner.address);

    const chainName = "bsc";
    let router = { eth: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", bsc: "0x10ED43C718714eb63d5aA57B78B54704E256024E" }
    let factory = { eth: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", bsc: "0xca143ce32fe78f1f7019d7d551a6402fc5350c73" }
    let wETH = { eth: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", bsc: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" }
    const NewRouter = await ethers.getContractFactory("HirokiRouter");
    const newRouter = await NewRouter.deploy(factory[chainName], wETH[chainName]);
    await newRouter.deployed();

    var tx = await newRouter.setFeeConfig("5000", owner.address);
    await tx.wait();
    console.log("new router deployment", newRouter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
