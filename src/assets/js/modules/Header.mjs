export default function Header(title, subTitle, image) {
	const header = `
    <Header>
      <img class="header-image" src="${image}"/>
      <div class="gradient">
        <h1>${title}</h1>
        <h2>${subTitle}</h2>
      </div>
    </Header>
  `;
	return header;
}
