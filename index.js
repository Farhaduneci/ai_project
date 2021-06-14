// Farhad Uneci, 9708253

// constants
const gameRounds = 20
const tableSize = 20

// HTML elements
var html_table = document.getElementById("table");
var html_table_head = document.createElement("THEAD");
var html_table_body = document.createElement("TBODY");

html_table.appendChild(html_table_head);
html_table.appendChild(html_table_body);

// Game board array
var board = new Array(tableSize).fill(null).map(() => Array(tableSize));

// 1 represents player 1
// 2 represents player 2
board[0][11] = 1;
board[0][7] = 2;

function printBoard(board) {
	// Clear table body out
	html_table_body.innerHTML = "";
	html_table_head.innerHTML = "";

	let table_head_row = document.createElement("TR");
	let table_head_empty_col = document.createElement("TD");

	table_head_row.classList = "border-2 border-gray-300 text-center";
	table_head_empty_col.classList = "border-2 border-gray-300";

	table_head_row.appendChild(table_head_empty_col);
	html_table_head.appendChild(table_head_row);

	for (let i = 0; i < board.length; i++) {
		let table_row = document.createElement("TR");
		html_table_body.appendChild(table_row);

		table_row.classList = "border-2 border-gray-300";

		let table_head = document.createElement("TH");

		table_head.classList = "border-2 border-gray-300";

		table_head.innerHTML = i;
		table_head_row.appendChild(table_head);

		let table_head_scope = document.createElement("TH");

		table_head_scope.classList = "border-2 border-gray-300";

		table_head_scope.innerHTML = i;
		table_row.appendChild(table_head_scope);

		for (let j = 0; j < board.length; j++) {
			let table_col = document.createElement("TD");
			table_col.classList =
				"border-2 border-gray-300 text-center h-8 w-8";

			if (board[i][j] == 1) table_col.classList.add("bg-red-600");
			else if (board[i][j] == 2) table_col.classList.add("bg-blue-800");

			table_col.innerHTML = "";
			table_row.appendChild(table_col);
		}
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomMove(board, player) {
	let playerTaws = [];

	board.forEach((row, index_row) => {
		row.forEach((col, index_col) => {
			col == player
				? playerTaws.push({ x: index_row, y: index_col })
				: null;
		});
	});

	const randomPlayerTaw =
		playerTaws[Math.floor(Math.random() * playerTaws.length)];

	do {
		var randomCoordinates = {
			x: getRandomInt(randomPlayerTaw.x - 1, randomPlayerTaw.x + 1),
			y: getRandomInt(randomPlayerTaw.y - 1, randomPlayerTaw.y + 1),
		};
	} while (
		(randomCoordinates.x == randomPlayerTaw.x &&
			randomCoordinates.y == randomPlayerTaw.y) ||
		(randomCoordinates.x != randomPlayerTaw.x &&
			randomCoordinates.y != randomPlayerTaw.y) ||
		randomCoordinates.x < 0 ||
		randomCoordinates.y > board.length ||
		board[randomCoordinates.x][randomCoordinates.y] == (player + 2) % 2 + 1 // Players bound
	);

	return randomCoordinates;
}

function randomGame(board) {
    let gameCounter = gameRounds
    let turn = 0

    // counter -- > 0
    while (gameCounter --> 0) {
        turn = (turn + 2) % 2 + 1
        let playerRandomMove = randomMove(board, turn)

        board[playerRandomMove.x][playerRandomMove.y] = turn
    }
}

printBoard(board)
randomGame(board)
printBoard(board)
