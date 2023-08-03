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
            const { email, username, phone, password } = req.body;
            let where = {};
            if (email) { where.email = email; }
            if (username) { where.username = username; }
            if (phone) { where.phone = phone; }

            const checkLogin = await users.findOne({ where });
            if (!checkLogin.isVerified) return res.status(403).json({ message: "Untuk alasan keamanan, anda harus verifikasi email terlebih dahulu!" });

            const passwordValid = await bcrypt.compare(password, checkLogin.password);
            if (!passwordValid) return res.status(422).json({ message: "Password incorrect"});

            let payload = {
                id: checkLogin.id,
                username: checkLogin.username,
                email: checkLogin.email,
                phone: checkLogin.phone,
            }

            const token = jwt.sign(
                payload,
                process.env.JWT_KEY, { expiresIn: '100h'}
            )

            return res.status(200).json({
                message: "Login success",
                data: token
            })
        } catch (error) {
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

            if (!decoded) return res.status(400).json({ message: 'Link verifikasi email atau token yang anda minta tidak valid. Pastikan link atau token tersebut tidak typo!' });

            await db.sequelize.transaction(async (t) => {
                const updateUser = await users.update(
                    { isVerified: true },
                    { where: { id: decoded.id } }, { transaction: t }
                );
            })

            return res.status(200).json({ message: 'Email anda berhasil diverfikasi. Silahkan lakukan login kembali.' });

        } catch (error) {
            return res.status(503).json({
                message: 'Mohon maaf, layanan tidak tersedia saat ini. Silakan coba lagi nanti.',
                error: err.message
            });
        }
    },
}
// user.sync({alter: true})
module.exports = AuthController;