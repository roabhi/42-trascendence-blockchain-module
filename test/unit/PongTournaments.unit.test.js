// * test/PongTournaments.unit.test.js

const { expect } = require('chai')

describe('PongTournaments', function () {
  let PongTournaments
  let pongTournaments
  let owner
  let addr1

  beforeEach(async function () {
    ;[owner, addr1] = await ethers.getSigners()
    PongTournaments = await ethers.getContractFactory('PongTournaments')
    pongTournaments = await PongTournaments.deploy()
    await pongTournaments.waitForDeployment()
  })

  it('Should deploy the contract with the correct owner', async function () {
    expect(await pongTournaments.owner()).to.equal(owner.address)
  }) // ? check deploy

  it('Should create and submit games for a tournament', async function () {
    const player1 = { name: 'Player1', score: 10 }
    const player2 = { name: 'Player2', score: 8 }
    const game1 = { player1, player2 }
    const game2 = {
      player1: { name: 'Player3', score: 12 },
      player2: { name: 'Player4', score: 6 },
    }
    const game3 = {
      player1: { name: 'Player1', score: 18 },
      player2: { name: 'Player3', score: 3 },
    }
    const tournamentName = 'Test Tournament'

    await pongTournaments.createAndSubmitGames(tournamentName, [
      game1,
      game2,
      game3,
    ])

    const games = await pongTournaments.getGames(tournamentName)

    expect(games.length).to.equal(3)
    expect(games[0].player1.name).to.equal(player1.name)
    expect(games[0].player1.score).to.equal(player1.score)
    expect(games[0].player2.name).to.equal(player2.name)
    expect(games[0].player2.score).to.equal(player2.score)
    expect(games[1].player1.name).to.equal(game2.player1.name)
    expect(games[1].player1.score).to.equal(game2.player1.score)
    expect(games[1].player2.name).to.equal(game2.player2.name)
    expect(games[1].player2.score).to.equal(game2.player2.score)

    expect(games[2].player1.name).to.equal(game3.player1.name)
    expect(games[2].player1.score).to.equal(game3.player1.score)
    expect(games[2].player2.name).to.equal(game3.player2.name)
    expect(games[2].player2.score).to.equal(game3.player2.score)
  })

  it('Should revert if submitting a new tournament with no games', async function () {
    const tournamentName = 'Empty Tournament'

    await expect(
      pongTournaments.createAndSubmitGames(tournamentName, [])
    ).to.be.revertedWith('No games submitted for the tournament')
  })

  it('Should revert if getting games for a non-existing tournament', async function () {
    const nonExistingTournament = 'Non Existing Tournament'

    await expect(
      pongTournaments.getGames(nonExistingTournament)
    ).to.be.revertedWith('Tournament not found')
  })
})
