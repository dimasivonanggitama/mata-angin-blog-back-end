const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({
    path: path.resolve('../.env')
});

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send("Anda harus login terlebih dahulu!");

    try {
        token = token.split(" ")[1];

        if (token === null || !token) return res.status(400).send("Permintaan anda tidak valid. Silahkan login ulang.");

        let verifiedUser = jwt.verify(token, process.env.JWT_KEY);
        if (!verifiedUser) return res.status(403).send("Untuk alasan keamanan, anda harus verifikasi email terlebih dahulu!");

        req.user = verifiedUser;
        next();
    } catch (error) {
        return res.status(400).send("Token Expired");
    }
}

module.exports = { verifyToken };