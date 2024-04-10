//imports

const { ethers, run, network } = require('hardhat')

//? main

async function verify(contractAddreess, args) {
  console.log('Verifying contract...')

  try {
    await run('verify:verify', {
      address: contractAddreess,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified')
    } else {
      console.log(e)
    }
  }
}

async function main() {
  console.log('Deploying contract')

  TournamentScores = await ethers.getContractFactory('TournamentScores')
  tournamentScores = await TournamentScores.deploy()
  await tournamentScores.waitForDeployment()

  console.log(`Deployed contract to ${tournamentScores.target}`)

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log('Awaiting block confirmations')
    await tournamentScores.deploymentTransaction().wait(6) //wait 6 blocks prior to verify our contract
    await verify(tournamentScores.target, [])
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
