

    export function createHeaderLogo() {
      const header = document.querySelector('header');

      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-label', 'Logo du site Les petits plats');

      const logoImage = document.createElement('img');
      logoImage.src = 'assets/logo.png';
      logoImage.alt = 'Logo Les petits plats';

      header.appendChild(logoImage);

    }
