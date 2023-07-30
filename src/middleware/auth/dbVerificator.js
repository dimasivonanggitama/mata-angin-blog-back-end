const db = require('../../models');
const users = db.User;

const dbVerificator = async (req, res, next) => {
    const { email, username, phone } = req.body;
    try {
        const emailExist = await users.findOne({
            where: { email: email },
        });
        if (emailExist) return res.status(409).json({ message: "Email sudah digunakan sebelumnya" });

        const usernameExist = await users.findOne({
            where: { username: username },
        });
        if (usernameExist) return res.status(409).json({ message: "Username sudah digunakan sebelumnya" });
        
        const phoneExist = await users.findOne({
            where: { phone: phone },
        });
        if (phoneExist) return res.status(409).json({ message: "Nomor telepon sudah digunakan sebelumnya" });

        next();
    } catch (err) {
        return res.status(503).json({
            message: 'Mohon maaf, layanan tidak tersedia saat ini. Silakan coba lagi nanti.',
            error: err.message
        });
    }
}

module.exports = { dbVerificator }