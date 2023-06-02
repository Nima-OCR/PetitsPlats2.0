export function createHeaderLogo() {
  const header = document.querySelector('header');

  header.setAttribute('tabindex', '0');
  header.setAttribute('aria-label', 'Logo du site Les petits plats');

  const divElement = document.createElement('div');
  divElement.className = ('header');

  const imgElement = document.createElement('img');
  imgElement.src = 'assets/headerImg.png';
  imgElement.alt = 'Image d\'en-tête du site Les petits plats';
  imgElement.className = ('header__img');

  const logoImage = document.createElement('img');
  logoImage.src = 'assets/logo.png';
  logoImage.alt = 'Logo Les petits plats';
  logoImage.classList.add('header__logo');

  const headingElement = document.createElement('div');
  headingElement.className = 'header__heading';

  const title = document.createElement('h1');
  title.textContent = 'CHERCHEZ PARMI PLUS DE 1500 RECETTES\n' +
    'DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES';
  title.className = 'header__title';




  header.appendChild(divElement)
  divElement.appendChild(logoImage);
  divElement.appendChild(imgElement);
  divElement.appendChild(headingElement);

  headingElement.appendChild(title);

}
