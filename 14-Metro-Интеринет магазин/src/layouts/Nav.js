class Nav {
	create() {
		let elem = document.createElement('nav');
		elem.classList.add('header__nav','nav');

		elem.innerHTML = `
		<ul class="nav__list">
			<li class="nav__item">
				<a class="nav__link" href="/">Home</a>
			</li>
			<li class="nav__item">
				<a class="nav__link" href="/#catalog/">Shop</a>
			</li>
			<li class="nav__item">
				<a class="nav__link" href="/#contacts/">Contacts</a>
			</li>
		</ul>
		`;

		return elem;
	}

	init() {
		let elem = this.create();

		return elem;
	}
}

let nav = new Nav().init();
export {nav};