import logo from "./logo.svg";
import "./style/App.css";
import SudokuBoard from "./component/sudoku-board";

/*

  Dette er hovedkomponenten din. Hvis du ser på nettsiden som et tre av komponenter, så vil App være roten.
  
  Siden index.js rendrer denne komponenten, så vil enhver komponent du legger inn her vises i browseren.

  OPPGAVE:

      Bygg appen med 'npm start' og kjør 'localhost:3000'

      App-komponenten inneholder nå masse standard drit fra React. Få bort all driten og legg inn 'SudokuBoard'
      komponenten som jeg allerede har importert.

      SudokuBoard komponenten er foreløpig tom, og inneholder bare et par eksempelkomponenter. Jobben din er å lage
      et sudoku-brett som er spillbart fra browseren.

      Start med å gå inn i components/sudoku-board.js
*/

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
