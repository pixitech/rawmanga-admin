export const regexMinlength = /.{12,}/;
export const regexUppercase = /(?=.*[A-Z])/;
export const regexLowercase = /(?=.*[a-z])/;
export const regexNumber = /(?=.*\d)/;
export const regexspecialCharacte = /(?=.*[$@#])/;

export const isPassRegex = (regex, value) => regex.test(value);
