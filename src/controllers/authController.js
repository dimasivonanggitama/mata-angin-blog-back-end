const bcrypt = require("bcrypt");
const db = require("../models");
const user = db.User;

const AuthController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            console.log("Kamu telah sampai di auth controller: register");
            return res.status(200).send("Kamu telah sampai di auth controller: register");

            // const salt = await bcrypt.genSalt(10);
            // const hashedPassword = await bcrypt.hash(password, salt);

            // await db.sequelize.transaction(async (t) => {
            //     const result = await users.create({
            //         username,
            //         email,
            //         phone,
            //         password: hashedPassword,
            //         isVerified: false
            //     }, { transaction: t });

            //     let payload = { id: result.id, email: result.email };

            //     const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' });

            //     const redirect = `http://localhost:3000/verification/${token}`;

            //     const data = await fs.readFile(
            //         path.resolve(__dirname, "../email/verificationEmail.html"), 'utf-8'
            //     );

            //     const tempCompile = handlebars.compile(data);
            //     const tempResult = tempCompile({ username, redirect });

            //     await transporter.sendMail({
            //         to: result.email,
            //         subject: "Verify Account",
            //         html: tempResult
            //     });

            //     return res.status(200).json({
            //         message: 'Register success. Please check your email to verify your account',
            //         data: result,
            //         token
            //     });
            // });
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
    }
}
// user.sync({alter: true})
module.exports = AuthController;