const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require('jsonwebtoken');
const transporter = require('../helpers/transporter');
const path = require('path');
const fs = require('fs').promises;
const handlebars = require('handlebars');
const user = db.User;

const AuthController = {
    register: async (req, res) => {
        try {
            const { username, email, password, phone } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await db.sequelize.transaction(async (t) => {
                const result = await user.create({
                    username,
                    email,
                    phone,
                    password: hashedPassword,
                    isVerified: false
                }, { transaction: t });

                let payload = { id: result.id, email: result.email };

                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

                const redirect = `http://localhost:3000/verification/${token}`;

                const data = await fs.readFile(
                    path.resolve(__dirname, "../email/verificationEmail.html"), 'utf-8'
                );

                const tempCompile = handlebars.compile(data);
                const tempResult = tempCompile({ username, redirect });

                await transporter.sendMail({
                    to: result.email,
                    subject: "Verify Account",
                    html: tempResult
                });

                return res.status(200).json({
                    message: 'Registrasi akun anda telah berhasil dilakukan. Silahkan periksa email anda untuk melakukan verifikasi akun.',
                    data: result,
                    token
                });
            });
        } catch (err) {
            return res.status(503).json({
                message: 'Mohon maaf, layanan tidak tersedia saat ini. Silakan coba lagi nanti.',
                error: err.message
            });
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
            return res.status(503).json({
                message: 'Mohon maaf, layanan tidak tersedia saat ini. Silakan coba lagi nanti.',
                error: err.message
            });
        }
    },
    verifyEmail: async (req, res) => {
        let token = req.headers.authorization;
        try {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);

            if (!decoded) return res.status(400).json({ message: 'Invalid token' });

            await db.sequelize.transaction(async (t) => {
                const updateUser = await users.update(
                    { isVerified: true },
                    { where: { id: decoded.id } }, { transaction: t }
                );
            })

            return res.status(200).json({ message: 'Email is verified successfully' });

        } catch (error) {
            return res.status(500).json({ message: "Failed to verify your email", error: error.message });
        }
    },
}
// user.sync({alter: true})
module.exports = AuthController;