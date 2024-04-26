// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PongTournaments {
    address public owner;

    struct Player {
        string name;
        uint256 score;
    }

    struct Game {
        Player player1;
        Player player2;
    }

    struct Tournament {
        string name;
        Game[] games;
    }

    mapping(string => Tournament) public tournaments;

    constructor() {
        owner = msg.sender;
    }

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

    function getGames(
        string memory _tournamentName
    ) external view returns (Game[] memory) {
        if (bytes(tournaments[_tournamentName].name).length == 0) {
            revert("Tournament not found");
        }
        return tournaments[_tournamentName].games;
    }
}
