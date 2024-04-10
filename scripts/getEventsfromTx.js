const { ethers, run, network } = require('hardhat')

async function main() {
  console.log('Deploying contract')

  TournamentScores = await ethers.getContractFactory('TournamentScores')
  tournamentScores = await TournamentScores.deploy()
  await tournamentScores.waitForDeployment()

  console.log(await tournamentScores.getAddress())
  // console.log(tournamentScores.interface.fragments)

  const tx = await tournamentScores.emitMyEvent('Hello World')

  const receipt = await tx.wait()

  // console.log(receipt)

  // receipt.interface.fragments.forEach((el, i) => {
  //   // if (ev.event) {
  //   //   emittedEvents.push({
  //   //     name: ev.event,
  //   //     args: ev.args,
  //   //   })
  //   // }
  //   console.log(el, i)
  // })
  // console.log(`emittedEvents: `, emittedEvents)

  // for (const event of receipt.interface.fragments) {
  //   console.log(`Event ${event.name} with args ${event.args}`)
  // }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
