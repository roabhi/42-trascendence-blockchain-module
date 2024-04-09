// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract TournamentScores {
    address public owner;

    // ? Struct to store participant information
    struct Participant {
        mapping(uint256 => uint256) scores; // ? Mapping from score ID to score. This would be an unique id of the user in our website coming fro db
        uint256[] scoreIds; // ? Dynamic array to store each user id
    }

    // ? Mapping to store participant information for each tournament
    mapping(uint256 => mapping(address => Participant)) private participants; // ? Map

    // TODO maybe we are going to send all calls from the deployer / owner of the contract!!!
    // TODO this would mean there will be only address accesing the contract which will be one associated with the website. ONE WALLET accessing the contract all the time

    event MyEvent(string message);

    // ? Event emitted when scores are submitted
    event ScoresSubmitted(
        address indexed participant,
        uint256 indexed tournamentId,
        uint256[] scoreIds,
        uint256[] scores
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    // ? Function to submit scores for a tournament
    function submitScores(
        uint256 tournamentId,
        uint256[] memory scoreIds,
        uint256[] memory scores
    ) external {
        require(scoreIds.length == scores.length, "Arrays length mismatch");
        require(scoreIds.length > 0, "At least one score must be submitted");

        // Update participant's scores and score IDs for the given tournament
        for (uint256 i = 0; i < scoreIds.length; i++) {
            participants[tournamentId][msg.sender].scores[scoreIds[i]] = scores[
                i
            ];
            participants[tournamentId][msg.sender].scoreIds.push(scoreIds[i]);
        }

        // ? Emit ScoresSubmitted event
        emit ScoresSubmitted(msg.sender, tournamentId, scoreIds, scores);
    }

    // ? Function to get all score IDs for a participant in a particular tournament
    function getScoreIds(
        uint256 tournamentId,
        address participant
    ) external view returns (uint256[] memory) {
        return participants[tournamentId][participant].scoreIds;
    }

    function emitMyEvent(string calldata s) public {
        emit MyEvent(s);
    }
}
