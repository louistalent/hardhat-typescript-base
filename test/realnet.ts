import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
const { utils } = ethers;

const addresses = {
    WETH: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
    TranshumanCoin: "0x56083560594E314b5cDd1680eC6a493bb851BBd8",
    TranshumanCoinStaking: "0x144960C94c846D30C3b4f373C348ed5f13C1f42a",
    Router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    Happy: "0xe9b9f6082C24d60c9676C0fF34DfC30Cf0278006"
}
describe("Unittesting", function () {
    var owner: any, factory: any, wETH: any, router: any;
    var testTokenWithFee: any, transhumanCoinStaking: any, happy: any;
    var initalBalance: any;
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    const deployedTokens = async () => {
        {
            // dex deployment
            [owner] = await ethers.getSigners();

            const WETH = await ethers.getContractFactory("WETH");
            wETH = await WETH.attach(addresses.WETH);

            const Router = await ethers.getContractFactory("UniswapV2Router02");
            router = await Router.attach(addresses.Router);

            const ERC20MockWithFee = await ethers.getContractFactory("TranshumanCoin");
            testTokenWithFee = await ERC20MockWithFee.attach(addresses.TranshumanCoin);

            const TranshumanCoinStaking = await ethers.getContractFactory("TranshumanCoinStaking");
            transhumanCoinStaking = await TranshumanCoinStaking.attach(addresses.TranshumanCoinStaking);

            const Happy = await ethers.getContractFactory("Happy");
            happy = await Happy.attach(addresses.Happy)
            // happy = await Happy.deploy();
            // await happy.deployed();
            console.log(happy.address);
        }
        return {
            owner,
            factory,
            wETH,
            router,
            testTokenWithFee
        }
    }

    describe("testing", function () {

        it("swapExactETHForTokensSupportingFeeOnTransferTokens should be success", async function () {
            await deployedTokens();

            // var tx = await router.swapExactETHForTokensSupportingFeeOnTransferTokens(
            //     0,
            //     [wETH.address, testTokenWithFee.address],
            //     happy.address,
            //     "111111111111111111111", {
            //     value: utils.parseUnits("2.86", 18)
            // })
            // var res = await tx.wait();
            // console.log(utils.formatUnits(await testTokenWithFee.balanceOf(owner.address), 9));
            // console.log(res.gasUsed);
        });

        it("staking testing with Contract", async function () {
            initalBalance = await ethers.provider.getBalance(owner.address);
            console.log("initial bnb balance", utils.formatUnits(initalBalance));
            console.log("initial token balance", utils.formatUnits(await testTokenWithFee.balanceOf(happy.address), 9));
            // var tx = await happy.approve(testTokenWithFee.address, transhumanCoinStaking.address);
            // await tx.wait();
            // var estimate = await happy.callStatic.runHappy(testTokenWithFee.address, transhumanCoinStaking.address, "100");
            // console.log("estimate", utils.formatUnits(estimate, 9));

            // var tx = await happy.runHappy(testTokenWithFee.address, transhumanCoinStaking.address, "80");
            // var res = await tx.wait();
            // console.log(String(res.gasUsed));
            console.log(utils.formatUnits(await testTokenWithFee.balanceOf(happy.address), 9));
        });
        it("exchange should be success", async function () {
            
            var tx = await happy.exchange(testTokenWithFee.address, router.address, utils.parseUnits("10306189", 9))
            await tx.wait();
            // console.log(utils.formatUnits(await ethers.provider.getBalance(owner.address)));
            console.log("final token balance", utils.formatUnits(await testTokenWithFee.balanceOf(happy.address), 9));
        });
        // it("staking testing with Contract", async function () {
        //     var tx = await happy.runHappy(testTokenWithFee.address, transhumanCoinStaking.address, "100");
        //     var res = await tx.wait();
        //     console.log(String(res.gasUsed));
        //     console.log(utils.formatUnits(await testTokenWithFee.balanceOf(happy.address), 9));
        // });
        // it("exchange should be success", async function () {
        //     var balance = await testTokenWithFee.balanceOf(happy.address);
        //     var tx = await happy.exchange(testTokenWithFee.address, router.address, balance);
        //     await tx.wait();

        //     let final = await ethers.provider.getBalance(owner.address)
        //     console.log("final happy", utils.formatUnits(final.sub(initalBalance)))
        //     console.log("rest", utils.formatUnits(await testTokenWithFee.balanceOf(transhumanCoinStaking.address), 9))
        // });
    });
});
