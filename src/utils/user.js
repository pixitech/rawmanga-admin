export const generatePassword = (passwordLength = 8) => {
	const lowerCase = "abcdefghijklmnopqrstuvwxyz";
	const upperCase = lowerCase ? lowerCase.toUpperCase() : "";
	const numberChars = "0123456789";
	const specialChars = '!"@$%+-_?^&*()';

	let generatedPassword = "";
	let restPassword = "";

	const restLength = passwordLength % 4;
	const usableLength = passwordLength - restLength;
	const generateLength = usableLength / 4;

	const randomString = (char) => {
		return char[Math.floor(Math.random() * char.length)];
	};
	for (let i = 0; i <= generateLength - 1; i++) {
		generatedPassword += `${randomString(lowerCase)}${randomString(
			upperCase
		)}${randomString(numberChars)}${randomString(specialChars)}`;
	}

	for (let i = 0; i <= restLength - 1; i++) {
		restPassword += randomString([...lowerCase, ...upperCase, ...numberChars, ...specialChars]);
	}

	return generatedPassword + restPassword;
};
