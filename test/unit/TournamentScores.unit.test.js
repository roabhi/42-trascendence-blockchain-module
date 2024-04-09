// * test/TournamentScores.test.js

const { expect } = require('chai')
// const hre = require('hardhat')
// const { time } = require('@nomicfoundation/hardhat-toolbox/network-helpers')

describe('TournamentScores Contract (Unit Tests)', function () {
  let TournamentScores
  let tournamentScores
  let owner
  let player1

  const getRandomValue = () => {
    return Math.round(Math.random() * (10 - 0) + 0) // ? Get rounded random values from 0 to 10
  }

  beforeEach(async function () {
    ;[owner, player1] = await ethers.getSigners()

    // ? Deploy the contract
    TournamentScores = await ethers.getContractFactory('TournamentScores')
    tournamentScores = await TournamentScores.deploy()
    await tournamentScores.waitForDeployment()
  })

  it('Should deploy the contract with the correct owner', async function () {
    expect(await tournamentScores.owner()).to.equal(owner.address)
  }) // ? check deploy

  // TODO revertedWith does not work

  it('Should not allow a participant to submit scores with mismatched lengths', async function () {
    // Submit scores for a new tournament with mismatched lengths
    const tournamentId = getRandomValue()
    const scoreIds = [getRandomValue(), getRandomValue(), getRandomValue()]
    const scores = [getRandomValue(), getRandomValue()] // Mismatched lengths

    // ? Expect a revert with an error message containing "Arrays length mismatch"
    await expect(
      tournamentScores
        .connect(player1)
        .submitScores(tournamentId, scoreIds, scores)
    ).to.be.revertedWith('Arrays length mismatch')
  }) // ? check if scoreIds and scores have relation in length

  it('Should not allow a participant to submit scores with no scores', async function () {
    // Submit scores for a new tournament with no scores
    const tournamentId = getRandomValue()
    const scoreIds = []
    const scores = []

    // ? Expect a revert with an error message containing "At least one score must be submitted"
    await expect(
      tournamentScores
        .connect(player1)
        .submitScores(tournamentId, scoreIds, scores)
    ).to.be.revertedWith('At least one score must be submitted')
  }) // ? Check if we are trying to submit scores with no value

  it('Should allow a participant to submit scores', async function () {
    // Submit scores for a new tournament
    const tournamentId = getRandomValue()
    const scoreIds = [getRandomValue(), getRandomValue(), getRandomValue()]
    const scores = [getRandomValue(), getRandomValue(), getRandomValue()]

    await tournamentScores
      .connect(player1)
      .submitScores(tournamentId, scoreIds, scores)

    // ? Check participant's score IDs for the tournament
    const participantScoreIds = await tournamentScores.getScoreIds(
      tournamentId,
      player1.address
    )

    expect(participantScoreIds).to.deep.equal(scoreIds)
  }) // ? check submit scores

  it('Should allow a participant to retrieve their scores', async function () {
    // ? Submit scores for a new tournament

    const tournamentId = getRandomValue()
    let scoreIds = [getRandomValue(), getRandomValue(), getRandomValue()]

    const scores = [getRandomValue(), getRandomValue(), getRandomValue()]

    await tournamentScores
      .connect(player1)
      .submitScores(tournamentId, scoreIds, scores)

    // ? Retrieve participant's scores for the tournament
    const retrievedScores = await tournamentScores.getScoreIds(
      tournamentId,
      player1.address
    )

    expect(retrievedScores).to.deep.equal(scoreIds)
  })

  // Add more unit tests for other functions as needed
})
