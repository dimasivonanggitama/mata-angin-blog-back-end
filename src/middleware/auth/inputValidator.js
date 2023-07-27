const emailValidator = (req, res, next) => {
    let result = false;
    let { email } = req.body;
    if (email == false) return res.status(422).send("Email tidak boleh kosong!");

    email = email.toLowerCase();

    // dimasivonanggitama @ gmail    .com
    // ------------------ | ------   ----------------
    //     email name     | domain   top level domain
    //                    |
    //              at / separator

    const atChar = email.indexOf("@");
    if (atChar < 0) return res.status(422).send("Email harus memiliki karakter '@' !");

    const domain = email.substr(atChar + 1, email.length - 1);
    const dotCharDomain = domain.indexOf(".");
    if (dotCharDomain < 0) return res.status(422).send("Domain email harus memiliki karakter titik (.) !");

    const domainPattern = /[a-z.]/;
    for (let i = 0; i < domain.length; i++) {
        result = domainPattern.test(domain[i]);
        if (result == false) return res.status(422).send("Karakter pada domain yang diperbolehkan hanya huruf dan titik (.) !");
    }

    const aliasName = email.substr(0, atChar);
    const aliasNamePattern = /[a-z0-9._]/;
    for (let i = 0; i < aliasName.length; i++) {
        result = aliasNamePattern.test(aliasName[i]);
        if (result == false) return res.status(422).send("Karakter pada nama email yang diperbolehkan hanya huruf, angka, titik (.) dan underscore (_) !");
    }

    return next();
};

const usernameValidator = (req, res, next) => {
    let result = false;
    let { username } = req.body;
    if (username == false) return res.status(422).send("Username tidak boleh kosong!");
    // if (username == false) res.status(422).send("Username tidak boleh kosong!");

    username = username.toLowerCase();
    const pattern = /[a-z0-9._]/;
    for (let i = 0; i < username.length; i++) {
        result = pattern.test(username[i]);
        if (result == false) return res.status(422).send("Karakter yang diperbolehkan hanya huruf, angka, titik (.) dan underscore (_) !");
    }
    return next();
}

const passwordValidator = (req, res, next) => {
    return next();
}

const phoneValidator = (req, res, next) => {
    return next();
}

module.exports = { usernameValidator, emailValidator };