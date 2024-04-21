import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import DotEnv from "dotenv"
DotEnv.config();

const config: HardhatUserConfig = {
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        ganache: {
            url: "http://127.0.0.1:7545",
            accounts: [process.env.PRIVATEKEY]
        },
        bsctestnet: {
            url: "http://185.25.48.34/api/v10/rpc/bsc-test",
            accounts: [process.env.PRIVATEKEY]
        },
        fantomtestnet: {
            url: "https://rpc.testnet.fantom.network",
            accounts: [process.env.PRIVATEKEY]
        },
        ethereum: {
            url: "https://main-light.eth.linkpool.io/",
            accounts: [process.env.PRIVATEKEY]
        },
        bsc: {
            url: "https://bsc-dataseed.binance.org/",
            accounts: [process.env.PRIVATEKEY]
        },
        matic: {
            url: "https://rpc-mainnet.matic.quiknode.pro",
            accounts: [process.env.PRIVATEKEY]
        },
        fantom: {
            url: "https://rpc.ftm.tools/",
            accounts: [process.env.PRIVATEKEY]
        },
        deamtest: {
            url: "https://testnet-rpc.deamchain.com",
            accounts: [process.env.PRIVATEKEY]
        },
        btc: {
            url: "https://rpc.bitcoinevm.co",
            accounts: [process.env.PRIVATEKEY]
        },
        goerli: {
            url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            accounts: [process.env.PRIVATEKEY]
        }
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: "A9EEM7GS15AHX2E9DRMBJEX852MH6KGKBI" //bsc: A9EEM7GS15AHX2E9DRMBJEX852MH6KGKBI //eth:29MFTZIIGKCF46RJZJN26WKQ1FTJTF2YRK
    },
    solidity: {
        compilers: [
            {
                version: "0.6.12",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                }
            },
            {
                version: "0.4.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                }
            },
            {
                version: "0.5.16",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                }
            },
            {
                version: "0.8.4",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                }
            },
            {
                version: "0.7.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                }
            },
        ]
    },
    mocha: {
        timeout: 200000
    }
};

export default config;
