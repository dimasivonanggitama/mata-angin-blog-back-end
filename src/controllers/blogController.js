const db = require('../models');
const blog = db.Blog;
const category = db.blogCategory;
// const { where } = require('sequelize');
const { Op } = db.Sequelize;

const BlogController = {
    getBlogById: async (req, res) => {
        const { id } = req.params;

        try {
            const blog = await blog.findOne({
                attributes: { exclude: ['category_id'] },
                where: { id },
                include: [{ model: db.category }]
            });
            if (!blog) return res.status(404).json('Data not found');

            res.status(200).json({ message: 'Data blog berhasil diambil', data: blog});
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengambil data blog. Silahkan coba kembali nanti'});
        }
    },
    createBlog: async (req, res) => {
        try {
            const {
                title,
                content,
                image,
                video,
                keyword_id,
                category_id,
                country_id
            } = req.body;
            await db.sequelize.transaction(async (t) => {
                const result = await blog.create({
                    title,
                    content,
                    image: req.file.path,
                    video,
                    keyword_id,
                    category_id,
                    country_id,
                    user_id: req.user.id
                }, { transaction: t })
                res.status(200).json({ message: 'Blog berhasil dibuat', data: result});
            });
        } catch (error) {
            res.status(500).json({ message: "Gagal membuat blog", error: error.message });
        }
    },

    getBlog: async (req, res) => {
        const { title, category_id, orderBy, size, page } = req.query;
        const limitPerPage = parseInt(size) || 10;
        const pageNumber = parseInt(page) || 1;
        const offset = (pageNumber - 1) * limitPerPage;
        const findTitle = {title: { [ Op.like ]: `%${title || ""}%` }}
        if (category_id) findTitle.category_id = category_id;

        try {
            const blogs = await blog.findAll({
                attributes: { exclude: ["category_id"] },
                where: findTitle,
                limit: limitPerPage,
                blogPage: pageNumber,
                offset,
                include: [{ model: category, attributes: { exclude: ["createdAt", "updatedAt"] } }],
                order: [["createdAt", orderBy || "ASC"]],
            });

            res.status(200).json({ message: 'Data blog berhasil diambil', listLimit: limitPerPage, blogPage: pageNumber, data: blogs });

        } catch (error) {
            res.status(500).json({ message: 'Failed to get blog data'});
        }
    }
};
// blog.sync({alter: true})
module.exports = BlogController;