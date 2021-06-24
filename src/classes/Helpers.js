// Helpers (from http://jaketrent.com/post/addremove-classes-raw-javascript/)
function hasClass(el, className) {
	if (el.classList) return el.classList.contains(className);
	else
		return !!el.className.match(
			new RegExp("(\\s|^)" + className + "(\\s|$)")
		);
}

function addClass(el, className) {
	if (el.classList) el.classList.add(className);
	else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
	if (el.classList) el.classList.remove(className);
	else if (hasClass(el, className)) {
		var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
		el.className = el.className.replace(reg, " ");
	}
}

/**
 * Returns a randomly selected integer in specific domain
 * @param {Number} min
 * @param {Number} max
 * @returns {Number} Random number between min and max
 */
function randomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Random move validation
 * @param {Object} coordinate - Newly generated coordination
 * @param {Object} playerTaw - Currently selected player's taw
 * @returns {Boolean} Indicates validation of the move (based on game rules)
 */
function randomMoveValidation(coordinate, playerTaw) {
	return (
		// If random coordinate is exactly the same with randomly selected player's taw position
		(coordinate.row == playerTaw.row && coordinate.col == playerTaw.col) ||
		// If both row and col is different with player's taw (based on game rules moves can only accrue in x & y directions)
		(coordinate.row != playerTaw.row && coordinate.col != playerTaw.col)
	);
}

/**
 * @param {Board} board - game board instance
 * @param {Object} playerTaw - current selected player taw
 * @returns {Boolean} - Indicates if player can move in any direction (based on game rules) from this taw location
 */
function hasAvailableMove(board, playerTaw) {
	// Boolean value representing empty space around the player taw
	let hasEmptyDirection = false;

	let directions = availableMoves(board, playerTaw);

	// Check for each of valid directions, the game board value and return true if there is still at least one empty space around
	directions.forEach((direction) => {
		if (
			// Empty places are represented with null value in the the game board, so, !null = true.
			!board.state[playerTaw.row + direction[0]][
				playerTaw.col + direction[1]
			]
		)
			hasEmptyDirection = true;
	});

	return hasEmptyDirection;
}

/**
 * @param {Board} board - game board instance
 * @param {Object} playerTaw - current selected player taw
 * @returns {Array} - Directions in witch the player can move
 */
function availableMoves(board, playerTaw) {
	// Directions to check availability for
	let directions = [
		[0, -1], // Left
		[0, 1], // Right
		[-1, 0], // Up
		[1, 0], // Down
	];

	// Filter out the wrong directions for being checked based on player taw location in game board
	// Imagine if the selected taw be "the top right corner" index of the game board, there will be no need
	// to check if it has empty space in right and top.
	return directions.filter(
		(direction) =>
			isInBoardBoundaries(board, direction, playerTaw) &&
			isEmpty(board, direction, playerTaw)
	);
}

function isInBoardBoundaries(board, direction, playerTaw) {
	if (
		// If the taw is in board boundaries
		playerTaw.row + direction[0] < 0 ||
		playerTaw.row + direction[0] >= board.size ||
		playerTaw.col + direction[1] < 0 ||
		playerTaw.col + direction[1] >= board.size
	)
		return false;

	return true;
}

function isEmpty(board, direction, playerTaw) {
	// If this place is already taken
	return !board.state[playerTaw.row + direction[0]][
		playerTaw.col + direction[1]
	];
}

function isTakenByPlayer(board, player, direction, playerTaw) {
	// If this place is already taken by the player
	return (
		board.state[playerTaw.row + direction[0]][
			playerTaw.col + direction[1]
		] == player.identifier
	);
}

/**
 * Returns a random element from an array
 * @param {Array} array - array to get a random element from
 * @returns {Object} One of input array elements
 */
function randomArrayElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function printBoard(board, player1Identifier, player2Identifier, tableId) {
	// HTML elements
	var html_table = document.getElementById(tableId);
	var html_table_head = document.createElement("THEAD");
	var html_table_body = document.createElement("TBODY");

	html_table.appendChild(html_table_head);
	html_table.appendChild(html_table_body);

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

			if (board[i][j] == player1Identifier) table_col.classList.add("bg-red-600");
			else if (board[i][j] == player2Identifier) table_col.classList.add("bg-blue-800");

			table_col.innerHTML = "";
			table_row.appendChild(table_col);
		}
	}
}

export {
	isEmpty,
	hasClass,
	addClass,
	randomInt,
	removeClass,
	availableMoves,
	isTakenByPlayer,
	hasAvailableMove,
	randomArrayElement,
	isInBoardBoundaries,
	randomMoveValidation,
};

export default printBoard;
