/**
 * @author Farhad Uneci, 9708253 <farhaduneci@gmail.com>
 */

import {
	randomInt,
	hasAvailableMove,
	randomArrayElement,
	randomMoveValidation as randomMoveIsNotValid,
} from "./Helpers";

/**
 * @desc This class represents the player, contains methods that performs player moves, minMax decision, etc...
 * @param {Array} state - an array representing the state of the board.
 */
class Player {
	/**
	 * Initializes the player
	 * @param {String} identifier - any character to represent this player in game board ie. "1", "X", etc...
	 */
	constructor(identifier) {
		this.identifier = identifier;
	}
	/**
	 * Selects a random player taw and generates a random move for that
	 * @param {Board} board - Board class instance
	 */
	randomMove(board) {
		if (board.constructor.name !== "Board")
			throw "The first argument to the randomMove method should be an instance of Board class.";

		let player_taws = board.getPlayerTaws(this);
		let randomPlayerTaw = randomArrayElement(player_taws);

		do {
			if (!hasAvailableMove(board, randomPlayerTaw)) {
				randomPlayerTaw = randomArrayElement(
					player_taws.filter(
						// Filter out current selected taw for next selection
						(taw) =>
							!(
								taw.row == randomPlayerTaw.row &&
								taw.col == randomPlayerTaw.col
							)
					)
				);
			}

			var randomCoordinate = {
				row: randomInt(
					randomPlayerTaw.row - 1,
					randomPlayerTaw.row + 1
				),
				col: randomInt(
					randomPlayerTaw.col - 1,
					randomPlayerTaw.col + 1
				),
			};
		} while (
			randomMoveIsNotValid(randomCoordinate, randomPlayerTaw) || // This coordination is not valid (based on game rules)
			!board.insertTaw(this, randomCoordinate) // This coordination is occupied
		);

		return randomCoordinate;
	}
}

export default Player;
