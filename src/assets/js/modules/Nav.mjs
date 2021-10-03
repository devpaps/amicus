//import jonpreece from "../../../assets/images/git.png";
//const x = require("../../../assets/images/git.png");
//require("../../../assets/images/git.png");
export default function NavBar() {
  const Nav = `
    <nav>
      <a href="/"> 
        <img src="./assets/images/git.png" class="nav-image"/>
        <p class="nav-text">Källkods<span>Projektet</span></p>
      </a>
      <input type="checkbox" id="menu"/>
      <label for="menu">Meny</label>
      <div class="meny">
        <a href="./app.html"><button>App.html</button></a>
        <a href="#" id="about"><button>Om mig</button></a>
        <a href="#" id="plan"><button>Projektplan</button></a>
      </div>
    </nav>
  `;
  return Nav;
}
