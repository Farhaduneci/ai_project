/**
 * @author Farhad Uneci, 9708253 <farhaduneci@gmail.com>
 */

import "./css/style.css";

import Board from "./classes/Board";
import Player from "./classes/Player";
import printBoard from "./classes/Helpers";

let board1 = new Board(20);
let board2 = new Board(20);
let board3 = new Board(20);

let player1 = new Player("🇦");
let player2 = new Player("🇧");

board1.insertTaw(player1, { row: 0, col: 7 });
board1.insertTaw(player2, { row: 0, col: 11 });

board2.insertTaw(player1, { row: 0, col: 7 });
board2.insertTaw(player2, { row: 0, col: 11 });

board3.insertTaw(player1, { row: 0, col: 7 });
board3.insertTaw(player2, { row: 0, col: 11 });

let x = 20;

var t0 = performance.now();

while (x-- > 0) {
	x % 2 == 0 ? player1.randomMove(board1) : player2.randomMove(board1);
}

var t1 = performance.now();
console.warn("Random Game took '" + (t1 - t0) + "' milliseconds.");

x = 20;

t0 = performance.now();

while (x-- > 0) {
	if (x % 2 == 0) {
		let playerTaws = board2.getPlayerTaws(player1);

		let moveEvaluations = new Map();

		playerTaws.forEach((taw) => {
			var coordinate = player1.miniMaxMove(
				{ row: taw.row, col: taw.col },
				player1,
				player2,
				2,
				true,
				board2
			);
			moveEvaluations.set(coordinate.bestMove, coordinate.evaluation);
		});

		board2.insertTaw(
			player1,
			[...moveEvaluations.entries()].reduce((a, e) =>
				e[1] > a[1] ? e : a
			)[0]
		);
	} else {
		let playerTaws = board2.getPlayerTaws(player2);

		let moveEvaluations = new Map();

		playerTaws.forEach((taw) => {
			var coordinate = player1.miniMaxMove(
				{ row: taw.row, col: taw.col },
				player1,
				player2,
				2,
				true,
				board2
			);
			moveEvaluations.set(coordinate.bestMove, coordinate.evaluation);
		});

		board2.insertTaw(
			player2,
			[...moveEvaluations.entries()].reduce((a, e) =>
				e[1] > a[1] ? e : a
			)[0]
		);
	}
}

t1 = performance.now();
console.warn("MiniMax Game took '" + (t1 - t0) + "' milliseconds.");

x = 20;

t0 = performance.now();

while (x-- > 0) {
	if (x % 2 == 0) {
		let playerTaws = board3.getPlayerTaws(player1);

		let moveEvaluations = new Map();

		playerTaws.forEach((taw) => {
			var coordinate = player1.miniMaxMove(
				{ row: taw.row, col: taw.col },
				player1,
				player2,
				2,
				true,
				board3
			);
			moveEvaluations.set(coordinate.bestMove, coordinate.evaluation);
		});

		board3.insertTaw(
			player1,
			[...moveEvaluations.entries()].reduce((a, e) =>
				e[1] > a[1] ? e : a
			)[0]
		);
	} else {
		let playerTaws = board3.getPlayerTaws(player2);

		let moveEvaluations = new Map();

		playerTaws.forEach((taw) => {
			var coordinate = player1.alphaBetaMove(
				{ row: taw.row, col: taw.col },
				player1,
				player2,
				2,
				Number.NEGATIVE_INFINITY,
				Number.POSITIVE_INFINITY,
				true,
				board3
			);
			moveEvaluations.set(coordinate.bestMove, coordinate.evaluation);
		});

		board3.insertTaw(
			player2,
			[...moveEvaluations.entries()].reduce((a, e) =>
				e[1] > a[1] ? e : a
			)[0]
		);
	}
}

t1 = performance.now();
console.warn("Alpha-beta Game took '" + (t1 - t0) + "' milliseconds.");

printBoard(board1.state, player1.identifier, player2.identifier, "table1");
printBoard(board2.state, player1.identifier, player2.identifier, "table2");
printBoard(board3.state, player1.identifier, player2.identifier, "table3");

calculateWinner("Random", player1, player2, board1);
calculateWinner("MiniMax", player1, player2, board2);
calculateWinner("Alpha-beta", player1, player2, board3);

function calculateWinner(game, player1, player2, board) {
    let player2_score = 0;
    let player1_score = 0;

    board.getPlayerTaws(player1).forEach(taw => {
        player1_score += board.eval(taw, player1, player2)
    })

    board.getPlayerTaws(player2).forEach(taw => {
        player2_score += board.eval(taw, player2, player1)
    })

    console.group("Game mode: ", game)
    console.log("Player 1 score: ", player1_score, "\n");
    console.log("Player 2 score: ", player2_score, "\n\n");
    console.log("Winner: ",);
    console.log(`%c Winner! ${player1_score > player2_score ? "PLAYER 1" : "PLAYER 2"} `, 'background: #222; color: #fff');
    console.groupEnd();
}
