// Farhad Uneci, 9708253

// HTML elements
var html_table = document.getElementById("table");
var html_table_head = document.createElement("THEAD");
var html_table_body = document.createElement("TBODY");

html_table.appendChild(html_table_head);
html_table.appendChild(html_table_body);

// Game board array
var board = new Array(20).fill(null).map(() => Array(20).fill(0));

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

		table_head.innerHTML = i + 1;
		table_head_row.appendChild(table_head);

		let table_head_scope = document.createElement("TH");

		table_head_scope.classList = "border-2 border-gray-300";

		table_head_scope.innerHTML = i + 1;
		table_row.appendChild(table_head_scope);

		for (let j = 0; j < board.length; j++) {
			let table_col = document.createElement("TD");
			table_col.classList =
				"border-2 border-gray-300 text-center h-8 w-8";

			if (board[i][j] == 1) table_col.classList.add("bg-red-400");
			else if (board[i][j] == 2) table_col.classList.add("bg-blue-400");

			table_col.innerHTML = "";
			table_row.appendChild(table_col);
		}
	}
}


