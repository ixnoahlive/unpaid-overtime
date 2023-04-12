import loadWard from './loadWard.js';

function main() {
	// Reads params in the URL of the form ?key=value
	const urlParams = new URLSearchParams(window.location.search);

	// Try to load a custom ward
	const customWard = urlParams.get('ward');
	if (customWard && loadWard(customWard)) {
		document.querySelector('#page-style').setAttribute('href', 'css/ward.css');
		return;
	}

	// Otherwise, load the frontpage
	const frontpage = document.getElementById('front-page');
	document.body.appendChild(frontpage.content);

	document.querySelector('#page-style').setAttribute('href', 'css/main.css');
}

main();
