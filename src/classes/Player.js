/**
 * @author Farhad Uneci, 9708253 <farhaduneci@gmail.com>
 */

import {
	randomInt,
	availableMoves as playerAvailableMoves,
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
	/**
	 * Generates the best possible move for a player taw
	 * @param {Object} position - Starting position for the algorithm to run
	 * @param {Number} depth - How far should the game tree expand
	 * @param {Boolean} isMaximizingPlayer - Indicates players turn
	 * @param {Board} board - Board class instance
	 */
	miniMaxMove(
		position,
		player,
		otherPlayer,
		depth,
		isMaximizingPlayer,
		board
	) {
		if (depth == 0 || board.isTerminal())
			return { evaluation: board.eval(position, player, otherPlayer) };

		let moveEvaluations = new Map();

		if (isMaximizingPlayer) {
			let maxEval = Number.NEGATIVE_INFINITY;
			playerAvailableMoves(board, position).forEach((move) => {
				let newPosition = {
					row: position.row + move[0],
					col: position.col + move[1],
				};

				let { evaluation } = this.miniMaxMove(
					newPosition,
					player,
					otherPlayer,
					depth - 1,
					false,
					board
				);

				maxEval = Math.max(maxEval, evaluation);
				moveEvaluations.set(newPosition, evaluation);
			});

			return {
				evaluation: maxEval,
				bestMove: [...moveEvaluations.entries()].length
					? [...moveEvaluations.entries()].reduce((a, e) =>
							e[1] > a[1] ? e : a
					  )[0]
					: {},
			};
		} else {
			let minEval = Number.POSITIVE_INFINITY;
			playerAvailableMoves(board, position).forEach((move) => {
				let newPosition = {
					row: position.row + move[0],
					col: position.col + move[1],
				};

				let { evaluation } = this.miniMaxMove(
					newPosition,
					player,
					otherPlayer,
					depth - 1,
					true,
					board
				);

				minEval = Math.min(minEval, evaluation);
				moveEvaluations.set(newPosition, evaluation);
			});

			return {
				evaluation: minEval,
				bestMove: [...moveEvaluations.entries()].length
					? [...moveEvaluations.entries()].reduce((a, e) =>
							e[1] > a[1] ? e : a
					  )[0]
					: {},
			};
		}
	}
	/**
	 * Generates the best possible move for a player taw (and also purges the game tree)
	 * @param {Object} position - Starting position for the algorithm to run
	 * @param {Number} depth - How far should the game tree expand
	 * @param {Boolean} isMaximizingPlayer - Indicates players turn
	 * @param {Board} board - Board class instance
	 */
	alphaBetaMove(
		position,
		player,
		otherPlayer,
		depth,
		alpha,
		beta,
		isMaximizingPlayer,
		board
	) {
		if (depth == 0 || board.isTerminal())
			return { evaluation: board.eval(position, player, otherPlayer) };

		let moveEvaluations = new Map();

		if (isMaximizingPlayer) {
			let maxEval = Number.NEGATIVE_INFINITY;
			playerAvailableMoves(board, position).forEach((move) => {
				let newPosition = {
					row: position.row + move[0],
					col: position.col + move[1],
				};

				let { evaluation } = this.alphaBetaMove(
					newPosition,
					player,
					otherPlayer,
					depth - 1,
					alpha,
					beta,
					false,
					board
				);

				maxEval = Math.max(maxEval, evaluation);
				alpha = Math.max(alpha, evaluation);
				if (beta >= alpha) moveEvaluations.set(newPosition, evaluation);
			});

			return {
				evaluation: maxEval,
				bestMove: [...moveEvaluations.entries()].length
					? [...moveEvaluations.entries()].reduce((a, e) =>
							e[1] > a[1] ? e : a
					  )[0]
					: {},
			};
		} else {
			let minEval = Number.POSITIVE_INFINITY;
			playerAvailableMoves(board, position).forEach((move) => {
				let newPosition = {
					row: position.row + move[0],
					col: position.col + move[1],
				};

				let { evaluation } = this.alphaBetaMove(
					newPosition,
					player,
					otherPlayer,
					depth - 1,
					alpha,
					beta,
					true,
					board
				);

				minEval = Math.min(minEval, evaluation);

				beta = Math.min(beta, evaluation);
				if (beta >= alpha) moveEvaluations.set(newPosition, evaluation);
			});

			return {
				evaluation: minEval,
				bestMove: [...moveEvaluations.entries()].length
					? [...moveEvaluations.entries()].reduce((a, e) =>
							e[1] > a[1] ? e : a
					  )[0]
					: {},
			};
		}
	}
}

export default Player;
