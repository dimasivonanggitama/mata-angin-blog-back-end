const bcrypt = require("bcrypt");
const db = require("../models");
const user = db.User;

const AuthController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body; console.log(req.body.username);
            return res.status(200).send("Kamu telah sampai di auth controller: register");
            
            // const isEmailExist = await User.findOne({ where : { email }});
            // if (isEmailExist) {
            //     return res.status(409).json({
            //         message: "Email atau Username sudah digunakan!"
            //     })
            // }
            // const salt = await bcrypt.genSalt(10); // 10x generate random karakter
            // const hashPassword = await bcrypt.hash(password, salt);
            // await db.sequelize.transaction( async (t) => {
            //     const result = await user.create({
            //         username,
            //         email,
            //         password: hashPassword
            //     }, { transaction: t });

            //     return res.status(200).json({
            //         message: "Akun berhasil didaftarkan",  
            //         data: result
            //     })
            // })
        } catch (err) {
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const isEmailExist = await User.findOne({ where: { email }, raw: true });
            if (!isEmailExist) {
                return res.status(401).json ({
                    message: "Email yang anda masukkan salah!"
                });
            }
            const isValid = await bcrypt.compare(password, isEmailExist.password);
            if (!isValid) {
                return res.status(401).json({
                    message: "Email atau Password yang anda masukkan salah!"
                })
            }
            return res.status(200).json({
                message: "Login berhasil"
            });
        } catch (err) {
            return res.status(err.statusCode || 500).json({
                message: err.message
            })
        }
    }
}
// user.sync({alter: true})
module.exports = AuthController;