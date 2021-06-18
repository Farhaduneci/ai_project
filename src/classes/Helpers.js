// Helpers (from http://jaketrent.com/po	st/addremove-classes-raw-javascript/)
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
	// Directions to check availability for
	let directions = [
		[0, -1], // Left
		[0, 1], // Right
		[-1, 0], // Up
		[1, 0], // Down
	];

	// Boolean value representing empty space around the player taw
	let hasEmptyDirection = false;

	// Filter out the wrong directions for being checked based on player taw location in game board
	// Imagine if the selected taw be "the top right corner" index of the game board, there will be no need
	// to check if it has empty space in right and top.
	directions = directions.filter((direction) => {
		if (
			playerTaw.row + direction[0] < 0 ||
			playerTaw.row + direction[0] >= board.size ||
			playerTaw.col + direction[1] < 0 ||
			playerTaw.col + direction[1] >= board.size
		)
			return false;
		return true;
	});

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
 * Returns a random element from an array
 * @param {Array} array - array to get a random element from
 * @returns {Object} One of input array elements
 */
function randomArrayElement(array) {
	return array[Math.floor(Math.random() * array.length)];
}

export {
	hasClass,
	addClass,
	randomInt,
	removeClass,
	hasAvailableMove,
	randomArrayElement,
	randomMoveValidation,
};
