const { ethers, run, network } = require('hardhat')

async function main() {
  console.log('Deploying contract')

  TournamentScores = await ethers.getContractFactory('TournamentScores')
  tournamentScores = await TournamentScores.deploy()
  await tournamentScores.waitForDeployment()

  console.log(tournamentScores.address)

  const tx = await tournamentScores.emitMyEvent('Hello World')

  const receipt = await tx.wait()

  // receipt.events.forEach((ev) => {
  //   if (ev.event) {
  //     emittedEvents.push({
  //       name: ev.event,
  //       args: ev.args,
  //     })
  //   }
  // })
  // console.log(`emittedEvents: `, emittedEvents)

  // for (const event of receipt.events) {
  //   console.log(`Event ${event.event} with args ${event.args}`)
  // }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
