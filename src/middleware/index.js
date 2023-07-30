const { usernameValidator, emailValidator, passwordValidator, phoneValidator } = require("./auth/inputValidator");
const { dbVerificator } = require("./auth/dbVerificator");

module.exports = { usernameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator };