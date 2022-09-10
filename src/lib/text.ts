const capitalize = (string: string) => {
	if (!string) return string;
	return string[0].toUpperCase() + string.substring(1);
};

const isCharacterALetter = (char: string) => {
	return /[a-zA-Z]/.test(char);
};

const summarize = (html: string): string => {
	const document = new DOMParser().parseFromString(html, 'text/html');

	const firstElement = document.body.querySelector('p');

	if (firstElement) {
		return firstElement?.textContent?.substring(0, 150) as string;
	} else {
		return "<p>Summary couldn't be generated</p>";
	}
};

export { summarize, isCharacterALetter, capitalize };
