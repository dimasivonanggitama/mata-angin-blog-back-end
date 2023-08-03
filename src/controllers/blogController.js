const db = require('../models');
const blog = db.blog;
const category = db.blogCategory;
// const { where } = require('sequelize');
const { Op } = db.Sequelize;

const BlogController = {
    getBlogById: async (req, res) => {
        const { id } = req.params;

        try {
            const blog = await blog.findOne({
                attributes: { exclude: ['categoryId'] },
                where: { id },
                include: [{ model: db.category }]
            });
            if (!blog) return res.status(404).json('Data not found');

            res.status(200).json({ message: 'Get blog data successfully', data: blog});
        } catch (error) {
            res.status(500).json({ message: 'Failed to get blog data'});
        }
    },
    createBlog: async (req, res) => {
        try {
            const {
                title,
                content,
                imgBlog,
                videoUrl,
                keywords,
                categoryId,
                countryId
            } = req.body;
            // if(content.length > 500) return res.status(500).json({ message: "Maximum 500 char" });
            await db.sequelize.transaction(async (t) => {
                const result = await blog.create({
                    title,
                    content,
                    imgBlog: req.file.path,
                    videoUrl,
                    keywords,
                    categoryId,
                    countryId,
                    userId: req.user.id
                }, { transaction: t })
                res.status(500).json({ message: 'Blog is created successfully', data: result});
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to create blog", error: error.message });
        }
    },

    getBlog: async (req, res) => {
        const { title, categoryId, orderBy, size, page } = req.query;
        const limitPerPage = parseInt(size) || 10;
        const pageNumber = parseInt(page) || 1;
        const offset = (pageNumber - 1) * limitPerPage;
        const findTitle = {title: { [ Op.like ]: `%${title || ""}%` }}
        if (categoryId) findTitle.categoryId = categoryId;

        try {
            const blogs = await blog.findAll({
                attributes: { exclude: ["categoryId"] },
                where: findTitle,
                limit: limitPerPage,
                blogPage: pageNumber,
                offset,
                include: [{ model: category, attributes: { exclude: ["createdAt", "updatedAt"] } }],
                order: [["createdAt", orderBy || "ASC"]],
            });

            res.status(200).json({ message: 'Get blog data successfully', listLimit: limitPerPage, blogPage: pageNumber, data: blogs });

        } catch (error) {
            res.status(500).json({ message: 'Failed to get blog data'});
        }
    }
};
blog.sync({alter: true})
module.exports = BlogController;