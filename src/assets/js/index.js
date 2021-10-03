import AboutPage from "./modules/About.mjs";
import PlanPage from "./modules/Plan.mjs";

import Navbar from "./modules/Nav.mjs";
import Header from "./modules/Header.mjs";
import Footer from "./modules/Footer.mjs";

function init() {
  console.log("Nu far vi! 🚀");

  const title = "Källkodsprojektet";
  const subTitle = "Min affärsplan";
  //const image = "../../assets/images/1.jpg";
  const image = "./assets/images/1.jpg";

  // Startsidan
  const indexPage = `
    <div id="index">
      <div id="navbar" class="small-wrapper">
        ${Navbar()}
      </div>
    ${Header(title, subTitle, image)}
      <main role="main" class="main">
        <section>
          <article>
            <h1 class="header">Petloose</h1>
            <p class="subheader">Jag hade tänkt att skapa en webbapplikation som ska vara ett hjälpmedel om någons husdjur springer bort.</p>
            <p class="main-text">
              Min tanke var att husdjursägare lättare skulle kunna få ut ett meddelande till andra om att just deras husdjur har sprungit bort. De som får meddelandet skulle givitvis också varit tvungen att
              ha applikationen. Husdjursägare skulle alltså trycka på en knapp så skickades det ut ett meddelande med tillhörande signalement på husdjuret och telefonnummer till ägaren. Varpå någon
              lätt skulle kunna höra av sig till ägaren lätt om de hittat husjuret.
              <br />
              Den skulle varit webbaserad så den kunde bli "installerad" på alla datorer och telefoner, bara de har en webbläsare.
            </p>
          </article>
        </section>
      </main>
      <footer class="footer">
        ${Footer()}
      </footer>
    </div>
  `;

  const app = document.getElementById("app");
  app.insertAdjacentHTML("afterbegin", indexPage);

  const about = document.getElementById("about");
  about.addEventListener("click", AboutPage);

  const plan = document.getElementById("plan");
  plan.addEventListener("click", PlanPage);
}

// DOM is loaded, now we can place stuff where it belongs in the nodes
document.addEventListener("DOMContentLoaded", init);
