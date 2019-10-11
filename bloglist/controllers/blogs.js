const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', (req, res) => {
    Blog
    .find({})
    .then(blogs => {
        res.json(blogs);
    });
});

blogsRouter.post('/', (req, res, next) => {
    const blog = new Blog(req.body);

    blog
    .save()
    .then(result => {
        res.status(201).json(result)
    })
    .catch(e => next(e));
});

module.exports = blogsRouter;