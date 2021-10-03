import AboutPage from "./About.mjs";

import Navbar from "./Nav.mjs";
import Header from "./Header.mjs";
import Footer from "./Footer.mjs";

export default function PlanPage() {
  const title = "Projektplan";
  const subTitle = "Planering av mitt case";
  const image = "./assets/images/2.jpg";

  const planPage = `
    <div id="pageThree">
      <div id="navbar" class="small-wrapper">
        ${Navbar()}
      </div>
    ${Header(title, subTitle, image)}

      <main role="main" class="main" >
        <section>
          <article>
            <h1>Amicus</h1>
            <p class="subheader">
              Jag kommer att skapa en webbapplikation med hjälp av ett ramverk som
              heter Next.js, det bygger på React i grunden samt MongoDb som databas.
            </p>

            <p class="main-text">
              <span>Syfte</span>: Många blir idag ägare till hundar, men få använder
              sig av en försäkring till sin hund. Jag känner att människor idag inte
              tar till sig information som är väsentlig för att införskaffa sig en
              hund. Därför vill jag skapa en samlingsplats för dem på webben. Dels
              för att få spridning av vad som gäller när man köper en hund samt för
              att få ett ställe där de kan ställa frågor till andra.
            </p>

            <p class="main-text">
              <span>Projektets mål</span>: Att skapa en webbapplikation innan 20/5
              där hundägare eller blivande hundägare ska kunna använda sig av ett
              forum som en samlingsplats. Webbapplikationen ska också fungera som en
              informationskälla där man kan till sig tips och råd om hur det är att
              äga en hund.
            </p>

            <h3>Genomförande</h3>
            <p class="text">
              Det ökar med fler och fler hundägare i Sverige, jag skulle tro att det
              vore en bra idé att utveckla en samlingplats för alla hundägare. Där
              kan de hitta nya vänner med likadana hundraser. Det kommer att finnas
              ett forum där alla som är medlemmar kan skriva om saker som är
              relvanta inom hundägande. Jag kommer lägga in en autensiering så de
              som vill kan bli medlemmar på webbapplikationen, och då få tillgång
              till forumet. Sedan har jag andra idéer som jag vill implementera om
              jag får tid eller kan, och det är att inkludera ett eller flera mindre
              api:er som ska innehålla data från olika djursjukhus och
              försäkringsbolag, vet inte exakt vad det är för data ännu. Men det
              blir en häftig bonus om jag får till det.
            </p>
            
            <h3>Teknik</h3>
            <p class="text">
              För att skapa den här webbapplikationen så tänker jag mig att en
              databas är ett måste om jag ska bygga ett forum. Databasen är en NoSQL
              databas som heter MongoDb, den kommer att gå hand i hand med ramverket
              Next.js som använder Node.js bakom kulisserna, det behöver jag för att
              integrera MongoDb med Next.js. <br />
              Jag har tittat runt lite på hur man ska tänka när man bygger forum med
              react, men jag har inte hittat något relevant, det finns nodeBB som
              jag kan använda mig av, men det är fusk. så jag ska försöka använda
              mig av MongoDb där jag gör olika collections som ska representera
              olika kategorier. Ska försöka lägga in så bara en Admin kan skapa
              dessa kategorier. Det här kommer blir riktigt riktigt spännande och
              kul!
            </p>
          </article>
        </section>
      </main>
    </div>
    <div class="footer">
      <footer>
        ${Footer()}
      </footer>
    </div>
    
  `;

  // Get the divs
  const app = document.getElementById("app");
  const index = document.getElementById("index");
  const aboutPage = document.getElementById("pageTwo");

  if (index) {
    // Tar bort alla element förutom #app
    index.parentNode.removeChild(index);
  } else {
    aboutPage.parentNode.removeChild(aboutPage);
  }

  // Adds the template from planPage template to the app node
  app.insertAdjacentHTML("afterbegin", planPage);

  const about = document.getElementById("about");
  about.addEventListener("click", AboutPage);
}
