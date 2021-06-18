/**
 * @file Manages the game board
 * @author Farhad Uneci, 9708253 <farhaduneci@gmail.com>
 */

/**
 * @desc This class represents the board, contains methods that checks board state, insert a symbol, etc..
 * @param {Number} size - an integer representing the board's state array size.
 */
class Board {
	// Initializing the board
	constructor(size) {
		this.size = size;
		this.state = [...Array(size)].map(
			() => [...Array(size)].map(() => null) // size*size array filled with null values
		);
	}
	// Prints the state as a HTML table
	printBoard() {}
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
	 * Checks if the board has a terminal state
	 * @return {Boolean}
	 */
	isTerminal() {
		// Return false if board in empty
		if (this.isEmpty()) return false;

		return this.isFull();
	}
}

export default Board;
