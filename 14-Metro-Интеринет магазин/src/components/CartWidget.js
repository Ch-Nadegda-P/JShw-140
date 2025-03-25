class CartWidget {
	create() {
		let elem = document.createElement('div');
		elem.classList.add('header__cart', 'cart_widget');

		let counterElem = document.createElement('span');
		counterElem.classList.add('cart_widget__count');
		counterElem.innerHTML = 0;

		let totalElem = document.createElement('span');
		totalElem.classList.add('cart_widget__total');
		totalElem.innerHTML = `$${0}`;

		elem.innerHTML = `
		<div class="cart_widget__item">
			<a class="cart_widget__link" href="/#cart/">
				<img src="/src/images/ico_cart.png" alt="cart">
				${counterElem.outerHTML}
			</a>
		</div>
		<div class="cart_widget__item">
			${totalElem.outerHTML}
		</div>
		`;

		return elem;
	}

	init() {
		let elem = this.create();

		return elem;
	}
}

let cartWidget = new CartWidget().init();
export {cartWidget};