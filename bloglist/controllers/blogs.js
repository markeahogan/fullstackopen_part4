const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (req, res, next) => {
    try{
        const blogs = await Blog.find({})
        res.json(blogs)
    }
    catch(e){
        next(e)
    }
});

blogsRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body);
    try{
        const r = await blog.save();
        res.status(201).json(r);
    }
    catch(e){
        next(e)
    }
});

blogsRouter.delete('/:id', async (req, res, next) => {
    try{
        const r = await Blog.deleteOne({_id:req.params.id})
        res.status(204).send();
    }
    catch(e){
        next(e);
    }
})

blogsRouter.put('/:id', async (req, res,next) => {
    try{
        const blog = await Blog.update({_id:req.params.id}, req.body);
        res.status(201).json(blog);
    }
    catch(e){
        next(e);
    }
})

module.exports = blogsRouter;