const emailValidator = (req, res, next) => {
    // const { username, email, password, phone } = req.body;
    // if (email.isEmpty()) return next();
    // else return next();

    // return 
    return next();
};

const usernameValidator = () => {
    const { username } = req.body;
    if (username.isEmpty()) return res.status(422).send("Username tidak boleh kosong!");

    username = username.toLowerCase();
    let result = false;
    const pattern = /[a-z0-9._]/;
    for (let i = 0; i < text.length; i++) {
        result = pattern.test(text[i]);
        if (result == false) return res.status(422).send("Karakter yang diperbolehkan hanya huruf, angka, titik (.) dan underscore (_)!");
    }
    return next();
}

const passwordValidator = () => {
    return next();
}

const phoneValidator = () => {
    return next();
}

module.exports = { inputVerificator };