/*
	Dette scriptet inneholder all logikken for sudoku-spillet. Du trenger ikke å endre noe her.

	Du trenger heller ikke å forstå alt som skjer i denne filen. Men det kan være greit å navigere seg til
	'SudokuPuzzle' klassen og se hvilke ferdige funksjoner den har. Det er nemlig denne klassen du skal bruke
	for spill-logikken.
*/

const coordinatesToIndex = (x, y) => y * 9 + x;

const indexY = (index) => Math.floor(index / 9);
const indexX = (index) => index % 9;

const indexSquareY = (index) => Math.floor(indexY(index) / 3);
const indexSquareX = (index) => Math.floor(indexX(index) / 3);

const indexSquareCoordinates = (index) => {
	return {
		x: indexSquareX(index),
		y: indexSquareY(index),
	};
};

const zeroToNine = () => [...Array(9).keys()];
const zeroToEightyOne = () => [...Array(81).keys()];

const rowIndices = (index) =>
	zeroToNine().map((digit) => indexY(index) * 9 + digit);

const columnIndices = (index) =>
	zeroToNine().map((digit) => digit * 9 + indexX(index));

const squareIndices = (index) => {
	const indices = [];
	const sqrCoords = indexSquareCoordinates(index);
	for (var x = sqrCoords.x * 3; x < sqrCoords.x * 3 + 3; x++) {
		for (var y = sqrCoords.y * 3; y < sqrCoords.y * 3 + 3; y++) {
			indices.push(coordinatesToIndex(x, y));
		}
	}
	return indices;
};

// Shuffles an array
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

const printCells = (cells) => {
	var hLine = "\n|-------|-------|-------|";
	var string = ``;
	for (var y = 0; y < 9; y++) {
		string += `${y % 3 === 0 ? `${hLine}` : ""}\n`;

		for (var x = 0; x < 9; x++) {
			string += `${x === 0 ? "|" : ""}${x % 3 === 0 ? " " : ""}${
				cells[coordinatesToIndex(x, y)]
			} ${x % 3 === 2 ? "|" : ""}`;
		}
	}
	string += hLine;
	console.log(string);
};

class Board {
	constructor() {
		this.cells = new Array(81).fill(0);
	}

	possibleValues(index) {
		const takenValues = [
			...new Set(
				rowIndices(index)
					.concat(columnIndices(index))
					.concat(squareIndices(index))
			),
		]
			.filter((i) => i !== index)
			.map((i) => this.cells[i])
			.filter((digit) => digit !== 0);

		return zeroToNine()
			.map((digit) => digit + 1)
			.filter((digit) => !takenValues.includes(digit));
	}

	fill(index = 0) {
		if (index >= 81) return true;
		else {
			var result = false;
			const pv = shuffle(this.possibleValues(index));

			for (var i = 0; i < pv.length; i++) {
				this.set(index, pv[i]);
				result = this.fill(index + 1);
				if (result) break;
			}
			if (!result) this.set(index, 0);
			return result;
		}
	}

	clear() {
		for (var i = 0; i < 81; i++) {
			this.set(i, 0);
		}
	}

	puzzlify() {
		const indices = shuffle(zeroToEightyOne());
		for (var i = 0; i < indices.length; i++) {
			const index = indices[i];
			if (this.possibleValues(index).length === 1 && this.get(index) !== 0) {
				this.set(index, 0);
				i = 0;
			}
		}

		const entries = indices
			.filter((index) => this.get(index) !== 0)
			.map((index) => {
				return {
					index: index,
					possibleValues: this.possibleValues(index).length,
				};
			});

		entries.sort((a, b) => a.possibleValues - b.possibleValues);
	}

	set(index, value) {
		this.cells[index] = value;
	}

	get(index) {
		return this.cells[index];
	}

	print() {
		printCells(this.cells);
	}

	clone() {
		const other = new Board();
		for (var i = 0; i < 81; i++) {
			other.set(i, this.get(i));
		}
		return other;
	}

	equals(other) {
		var solved = true;
		for (var i = 0; i < 81 && solved; i++) {
			solved = this.get(i) === other.get(i);
		}
		return solved;
	}

	setTo(other) {
		for (var i = 0; i < 81; i++) {
			this.set(i, other.get(i));
		}
	}
}

class SudokuPuzzle {
	constructor() {
		this.solution = new Board();
		this.puzzle = new Board();
		this.board = new Board();
		this.init();
	}

	init() {
		this.solution.fill();
		this.puzzle.setTo(this.solution);
		this.puzzle.puzzlify();
		this.board.setTo(this.puzzle);
	}

	// Clears the board and creates a new puzzle.
	reset() {
		this.solution.clear();
		this.init();
	}

	setValue(x, y, value) {
		const index = coordinatesToIndex(x, y);
		if (this.puzzle.get(index) !== 0) {
			throw Error("Attempted to set a cell value that is locked.");
		} else if (value <= 0 || value > 9 || !Number.isInteger(value)) {
			throw Error("Cell value must be an integer between 1 and 9.");
		} else {
			this.board.set(index, value);
		}
	}

	getValue(x, y) {
		if (x < 0 || x >= 9) {
			throw Error("x must be an index between 0 and 8.");
		}
		if (y < 0 || y >= 9) {
			throw Error("y must be an index between 0 and 8.");
		} else {
			const value = this.board.get(coordinatesToIndex(x, y));
			return value === 0 ? null : value;
		}
	}

	// Locked cells can not be changed by the user.
	isLocked(x, y) {
		return this.puzzle.get(coordinatesToIndex(x, y)) !== 0;
	}

	isSolved() {
		return this.board.equals(this.solution);
	}

	// Returns the puzzle to its initial state
	clear() {
		this.board.setTo(this.puzzle);
	}

	print() {
		this.board.print();
	}

	printSolution() {
		this.solution.print();
	}
}


/* 
	Her eksporterer jeg klassen SudokuPuzzle med Node.js. Det er annerledes fra å eksportere React-komponenter, og da bruker
	man syntaksen under.
*/
module.exports = { SudokuPuzzle };
