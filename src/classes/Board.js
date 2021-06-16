/**
 * @author Farhad Uneci, 9708253 <farhaduneci@gmail.com>
 */

/**
 * @desc This class represents the board, contains methods that checks board state, insert a symbol, etc..
 * @param {Array} state - an array representing the state of the board
 */
class Board {
	//Initializing the board
	constructor(size, rounds = 20) {
		this.size = size;
		this.rounds = rounds;
		this.state = new Array(size)
			.fill(null)
			.map(() => Array(size).fill(null));
	}
	//Prints the state as a HTML table
	printBoard() {}
	//Checks if board has no symbols yet
	isEmpty() {
		return this.state.every(row => row.every(col => !col));
	}
	//Check if board has no spaces available
	isFull() {
		return this.state.every(row => row.every(col => col));
	}
	/**
	 * Inserts a new symbol into state
	 * @param {String} symbol
	 * @param {Number} position
	 * @return {Boolean} boolean represent success of the operation
	 */
	insert(symbol, position) {
		if (position > this.size || this.state[position]) return false; //Cell is either occupied or does not exist
		this.state[position] = symbol;
		return true;
	}
	//Returns an array containing available moves for the current state
	getAvailableMoves() {
		const moves = [];
		this.state.forEach((cell, index) => {
			if (!cell) moves.push(index);
		});
		return moves;
	}
	/**
	 * Checks if the board has a terminal state ie. players have completed "this.rounds" rounds of playing
	 * @return {Boolean}
	 */
	isTerminal() {
		//Return False if board in empty
		if (this.isEmpty()) return false;

		return this.rounds > 0;
	}
}

export default Board;
