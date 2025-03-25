class Main {
	create() {
		let elem = document.createElement('main');
		elem.classList.add('main');

		let elemContainer = document.createElement('div');
		elemContainer.classList.add('container');

		elem.append(elemContainer);

		return [elem, elemContainer];
	}

	createTitle() {
		let elem = document.createElement('h1');
		elem.classList.add('main__title');

		return elem;
	}

	createContent() {
		let elem = document.createElement('div');
		elem.classList.add('main__content');

		return elem;
	}

	init() {
		let elems = this.create();

		let titleElem = this.createTitle('');

		let contentElem = this.createContent();

		if (titleElem) elems[0].prepend(titleElem);
		if (contentElem) elems[1].append(contentElem);

		elems.push(titleElem);

		return elems;
	}
}

let mainElems = new Main().init();
let main = mainElems[0];
let mainContainer = mainElems[1];
let mainTitle = mainElems[2];
export {main, mainContainer, mainTitle};