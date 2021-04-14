import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
import App from "./App"; // Her importeres App.js komponenten

/*

  START MED Å SE HER!

  Når nettsiden bygges vil Node.js automatisk se etter index.js (denne filen) i prosjektmappen og kjøre den først. 

  Denne JavaScript filen kjører funksjonen ReactDOM.render. Denne funksjonen forteller browseren hva den skal rendre.

  Hvis du ser etter så ser du at 2 parametre blir passet inn i
  funksjonen:


    1. Den første parameteren ser slik ut:
    
        <React.StrictMode>
		      <App />
	      </React.StrictMode>

      Det ser litt ut som HTML, men i virkeligheten er det en React-komponent.

          a) Det ytterste elementet av komponenten, <React.StrictMode>, er et verktøy som brukes for å finne feil med
             applikasjonen. Du trenger ikke bry deg om denne.

          b) Det innerste elementet av komponenten, <App />, inneholder selve applikasjonen din. Den er definert i App.js



    2. Den andre parameteren ser slik ut:

        document.getElementById("root")

      Denne parameteren forteller funksjonen hvilket HTML element (i browseren) komponenten oppgitt i første parameter skal
      rendres inni.

  
  For å oppsummere, funksjonen forteller browseren at den skal rendre den oppgitte komponenten i HTML-elementet kalt 
  "root". Dette gjør at komponenten (som inneholder hele applikasjonen din) rendres i browseren.


  Du skal ikke endre på noe her, men det er greit å vite hva denne filen gjør.
  Du kan gå videre inn i App.js for å lage appen din.

*/

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
