class Footer {
	create() {
		let elem = document.createElement('footer');
		elem.classList.add('footer');

		let elemContainer = document.createElement('div');
		elemContainer.classList.add('container');

		elem.append(elemContainer);

		return [elem, elemContainer];
	}

	createLogo() {
		let elem = document.createElement('div');
		elem.classList.add('footer__logo');

		elem.innerHTML = `
		<a href="/"><img src="/src/images/logo_black.png" alt="#"></a>
		`;

		return elem;
	}

	createContacts() {
		let elem = document.createElement('ul');
		elem.classList.add('footer__contacts');

		elem.innerHTML = `
		<li class="footer__contacts_item">
			<img class="footer__contacts_ico" src="/src/images/ico_location.svg" alt="location">
			<a class="footer__contacts_link" target="_blank" href="https://maps.google.com/">59 Street, Newyork City, Rose Town, 05 Rive House</a>
		</li>
		<li class="footer__contacts_item">
			<img class="footer__contacts_ico" src="/src/images/ico_phone.svg" alt="phone">
			<a class="footer__contacts_link" href="tel:375291111111">+123 456 7890</a>
		</li>
		<li class="footer__contacts_item">
			<img class="footer__contacts_ico" src="/src/images/ico_letter.svg" alt="letter">
			<a class="footer__contacts_link" href="mailto:info@example.com">info@example.com</a>
		</li>
		`;

		return elem;
	}

	init() {
		let elems = this.create();

		let logoElem = this.createLogo();
		let contactsElem = this.createContacts();

		if (logoElem) elems[1].append(logoElem);
		if (contactsElem) elems[1].append(contactsElem);

		return elems[0];
	}
}

let footer = new Footer().init();
export {footer};