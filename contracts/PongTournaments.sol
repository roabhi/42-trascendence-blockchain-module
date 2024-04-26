// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ! Remove the console import
import "hardhat/console.sol";

contract PongTournaments {
    address public owner;

    // ? Struct to store player information
    struct Player {
        string name;
        uint256 score;
    }

    // ? Struct to store game information
    struct Game {
        Player player1;
        Player player2;
    }

    // ? Struct to store tournament information
    struct Tournament {
        string name;
        Game[] games;
    }

    // ? Mapping to store games for each tournament
    mapping(string => Tournament) public tournaments;

    constructor() {
        owner = msg.sender;
    }

    // ? Function to create a new tournament and submit games for it
    function createAndSubmitGames(
        string memory _tournamentName,
        Game[] memory _games
    ) external {
        require(_games.length > 0, "No games submitted for the tournament");

        Tournament storage newTournament = tournaments[_tournamentName];
        newTournament.name = _tournamentName;

        for (uint256 i = 0; i < _games.length; i++) {
            newTournament.games.push(_games[i]);
        }
    }

    // ? Function to get all games and scores for a tournament
    function getGames(
        string memory _tournamentName
    ) external view returns (Game[] memory) {
        if (bytes(tournaments[_tournamentName].name).length == 0) {
            revert("Tournament not found");
        }
        return tournaments[_tournamentName].games;
    }
}
