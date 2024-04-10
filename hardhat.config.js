require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.8',
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL || '', // h
      accounts: [PRIVATE_KEY] || '0key', // fe9d82463225b72a5a3bf31eed8b88436a627e7fa665807fdd443144550b5958
      chainId: 11155111,
      blockConfirmations: 6,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/', // ? url running from npx hardhat node
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  // namedAccounts: {
  //   deployer: {
  //     default: 0,
  //   },
  // },
}
