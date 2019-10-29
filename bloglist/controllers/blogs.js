const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const mongoose = require('mongoose');

const getAnyUser = async () => {
    const users = await User.find({});
    return users[0];
}

blogsRouter.get('/', async (req, res, next) => {
    try{
        const blogs = await Blog.find({}).populate('user', {username:1, name:1});
        res.json(blogs);
    }
    catch(e){
        next(e)
    }
});

blogsRouter.post('/', async (req, res, next) => {
    
    const blogData = req.body;

    const user = await getAnyUser();    
    blogData.user = user._id;   
    
    const blog = new Blog(blogData);
    
    try{
        const r = await blog.save();
        user.blogs = user.blogs.concat(r._id);
        await user.save();
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