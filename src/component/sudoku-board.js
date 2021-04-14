/*
  Før du starter her anbefaler jeg å lese deg opp på hva states og props er i React komponenter.
*/

// HVORDAN LAGE EN REACT-KOMPONENT:

import React from "react"; // Importer React
import { SudokuPuzzle } from "../helpers/sudoku-helper"; // Importer andre komponenter eller hjelpefunksjoner
import "../style/sudoku-board.css"; // Importer CSS filer for å style.

/*
  Dette er den første måten man kan definere en komponent på. Dette fungerer bra hvis komponenten ikke har states,
  fordi det tar mindre plass og krever mindre koding. Dersom du ikke har krøllparanteser på parametrene, så vil
  første parameter inneholde alle props.
*/
const ExampleButton1 = (props) => {
	return <button onClick={props.onClick}>{props.text}</button>;
};

/*
  Dette er den andre måten å definere en komponent på. Den er ganske lik måte nummer én, bortsett fra at vi har navngitt
  parameterene ved å bruke krøllparantes. Dermed kan vi bruke dem direkte uten å bruke props.
*/
const ExampleButton2 = ({ onClick, text }) => {
	return <button onClick={onClick}>{text}</button>;
};

/*
  Begge disse måtene fungerer godt hvis du raskt vil ha en komponent som ikke trenger å holde på states. 

  (MERK: Dersom du likevel vil ha states på slike komponenter kan det oppnås med useState. Dette må du søke opp for å
  lære deg.)
  
  Det er vanlig å definere små hjelpekomponenter på denne måten, mens hovedkomponenter ofte er litt større 
  og trenger mer funksjonalitet.
*/

/* Dette er den tredje måten man kan definere en komponent på. Dette fungerer bra hvis komponenten din har states, og brukes
  oftest for hovedkomponenter som er større og trenger mer funksjonalitet.

  I tillegg til å ha states kan du bruke React.Component sine innebygde funksjoner, som f eks componentDidMount
  
*/

/*
    Her kan du sette i gang å lage en Sudokubrett komponent. Tenk over hvilke komponenter denne komponenten trenger
    (f. eks. knapper og slikt), lag det separat, og gjenbruk det her. Husk å bruke hjelpefunksjonen jeg lagde for 
    logikken til sudokubrettet :)
*/

class SudokuBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "This is a sample state that can be removed.",
		};
	}

	// Denne funksjonen kjøres i det komponenten lastes inn i browseren.
	componentDidMount() {
		console.log("The sudoku board component was mounted.");
	}

	// Denne funksjonen kjøres hver gang browseren rendres
	render() {
		return (
			<div>
				<ExampleButton1
					onClick={() => alert("Button 1 was clicked")}
					text={"Button 1"}
				/>
				<ExampleButton2
					onClick={() => alert("Button 2 was clicked")}
					text={"Button 2"}
				/>
			</div>
		);
	}
}

/*
  React-komponenter kan eksporteres på 2 måter:

    1.  Hvis du kun skal eksportere én komponent fra filen skriver du bare 'export default' og navnet på det
        du skal eksportere.

    2. Dersom du skal eksportere flere komponenter fra samme fil må du navngi dem med krøllparanteser. Da skriver
       du 'export {}' og detter komponentene inn i krøllparantesene skilt med komma. For eksempel, for å eksportere
       begge knappekomponentene kunne jeg skrevet 'export {ExampleButton1, ExampleButton2}'.

       For å importere navngitte komponter må man da huske på å bruke krøllparanteser. For eksempel kan knappene 
       importeres ved å skrive 'import {ExampleButton1, ExampleButton2}'. Du kan også velge å bare importere én av
       knappene.

  Her eksporteres kun sudoku-brettet. Knappekomponentene brukes kun i SudokuBoard komponenten, og trenger derfor ikke
  eksporteres.
*/
export default SudokuBoard;
