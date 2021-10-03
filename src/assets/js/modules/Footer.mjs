export default function Footer() {
	// Prints the year
	const whatYearIsIt = new Date().getFullYear();

	const footer = `
  <footer>
    <p> © ${whatYearIsIt} Lars Jönsson</p>
  </footer>
  `;
	return footer;
}
