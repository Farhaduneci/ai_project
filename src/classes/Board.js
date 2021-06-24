/**
 * @file Manages the game board
 * @author Farhad Uneci, 9708253 <farhaduneci@gmail.com>
 */

import { isInBoardBoundaries, isTakenByPlayer } from "./Helpers";

/**
 * @desc This class represents the board, contains methods that checks board state, insert a symbol, etc..
 * @param {Number} size - an integer representing the board's state array size.
 */
class Board {
	// Initializing the board
	constructor(size) {
		this.size = size;
		this.state = [...Array(size)].map(
			() => [...Array(size)].map(() => 0) // size*size array filled with null values
		);
	}
	/**
	 * Checks if board has no symbols yet
	 * @returns {Boolean}
	 */
	isEmpty() {
		return this.state.every((row) => row.every((col) => !col));
	}
	/**
	 * Checks if board is full
	 * @return {Boolean} Representing if the board has any available space or not
	 */
	isFull() {
		return this.state.every((row) => row.every((col) => col));
	}
	/**
	 * Inserts a new symbol into state
	 * @param {Player} player - Player's identifier is used as inserted symbol
	 * @param {Object} position
	 * @param {Number} position.row
	 * @param {Number} position.col
	 * @return {Boolean} Representing success of the operation
	 */
	insertTaw(player, position) {
		if (
			// Check if position is in board boundaries
			position.row < 0 ||
			position.row >= this.size ||
			position.col < 0 ||
			position.col >= this.size ||
			// Check if position is already taken
			this.state[position.row][position.col]
		)
			return false; // Cell is either occupied or does not exist

		this.state[position.row][position.col] = player.identifier;
		return true;
	}
	/**
	 * Returns an array containing available moves for the current state
	 * @param {Player} player - Player's identifier is used as search symbol
	 * @returns {Array} Contains all player taws
	 */
	getPlayerTaws(player) {
		if (player.constructor.name !== "Player")
			throw "The first argument to the getPlayerTaws method should be an instance of Player class.";

		const player_taws = [];

		this.state.forEach((row, index_row) => {
			row.forEach((col, index_col) => {
				if (col == player.identifier)
					player_taws.push({ row: index_row, col: index_col });
			});
		});

		return player_taws;
	}
	/**
	 * Evaluates a position based on game rules
	 * @param {Object} position
	 * @param {Number} position.row
	 * @param {Number} position.col
	 * @param {Player} player - Player's identifier is used as inserted symbol
	 * @returns {Number} Indicating evaluation score of the selected position based on game rules
	 */
	eval(position, player, otherPlayer) {
		let score = 0;
		let directions = [
			[-1, 0], // Up
			[1, 0], // Down
			[-2, 2],
			[-2, -2],
			[2, -2],
			[2, 2],
		];

		// Directions in board boundaries and taken by user
		directions = directions.filter(
			(direction) =>
				isInBoardBoundaries(this, direction, position) &&
				!isTakenByPlayer(this, otherPlayer, direction, position)
		);

		directions.forEach((direction) => {
			if (direction == directions[0] || direction == directions[1]) {
				if (isTakenByPlayer(this, player, direction, position))
					score += 10;
			} else {
				if (isTakenByPlayer(this, player, direction, position))
					score += 1000;
			}
		});

		return score;
	}
	/**
	 * Checks if the board has a terminal state
	 * @return {Boolean}
	 */
	isTerminal() {
		return this.isFull();
	}
}

export default Board;
