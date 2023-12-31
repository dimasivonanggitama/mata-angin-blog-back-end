const { usernameValidator, emailValidator, passwordValidator, phoneValidator } = require("./auth/inputValidator");
const { dbVerificator } = require("./auth/dbVerificator");
const { tokenVerificator } = require("./auth/tokenVerificator");
const { multerUpload } = require("./blog/multer");

module.exports = { usernameValidator, emailValidator, passwordValidator, phoneValidator, dbVerificator, tokenVerificator, multerUpload };