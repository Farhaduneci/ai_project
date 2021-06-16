//Helpers (from http://jaketrent.com/po	st/addremove-classes-raw-javascript/)
function hasClass(el, className) {
	if (el.classList) return el.classList.contains(className);
	else
		return !!el.className.match(
			new RegExp("(\\s|^)" + className + "(\\s|$)")
		);
}

function addClass(el, className) {
	if (el.classList) el.classList.add(className);
	else if (!hasClass(el, className)) el.className += " " + className;
}

function removeClass(el, className) {
	if (el.classList) el.classList.remove(className);
	else if (hasClass(el, className)) {
		var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
		el.className = el.className.replace(reg, " ");
	}
}

function randomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { hasClass, addClass, removeClass, randomInt };
