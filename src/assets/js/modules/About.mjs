import PlanPage from "./Plan.mjs";

import Navbar from "./Nav.mjs";
import Header from "./Header.mjs";
import Footer from "./Footer.mjs";

export default function About() {
  const title = "Om mig";
  const subTitle = "Den glada utvecklaren";
  const image = "./assets/images/me.jpg";

  const aboutPage = `
		<div id="pageTwo">
			<div id="navbar" class="small-wrapper">
				${Navbar()}
			</div>
			${Header(title, subTitle, image)}
			<main role="main" class="main">
				<section>
					<article class="about-me">
						<h1 class="about-me-title">Kontaktuppgifter</h1>
						<h3>Lars Jönsson</h3>
						<br />
						<p>Telefonnummer</p>
						<a href="tel: 0705120502">070-5120502</a>
						<br />
						<br />
						<p>E-post</p>
						<a href="mailto: crymeat@gmail.com">crymeat@gmail.com</a>
					</article>
				</section>
			</main>
			<footer class="footer">
				${Footer()}
			</footer>
		</div>
	`;

  // Get the divs
  const app = document.getElementById("app");
  const index = document.getElementById("index");
  const planPage = document.getElementById("pageThree");

  if (index) {
    // Tar bort alla element förutom #app
    index.parentNode.removeChild(index);
  } else {
    planPage.parentNode.removeChild(planPage);
  }

  // Adds the template from aboutPage template to the app node
  app.insertAdjacentHTML("afterbegin", aboutPage);

  const plan = document.getElementById("plan");
  plan.addEventListener("click", PlanPage);
}
