const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
    
    try{
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
    
        if (!decodedToken.id){
            return res.status(401).json({error:'token missing or invalid'});
        }

        const user = await User.findById(decodedToken.id);    
        
        blogData.user = user._id;   
        const blog = new Blog(blogData);    
        const savedBlog = await blog.save();

        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        res.status(201).json(savedBlog);
    }
    catch(e){
        next(e)
    }
});

blogsRouter.delete('/:id', async (req, res, next) => {
    try{
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
    
        if (!decodedToken.id){
            return res.status(401).json({error:'token missing or invalid'});
        }

        const blog = await Blog.findOne({_id:req.params.id})
        if (blog.user.toString() != decodedToken.id){
            return res.status(401).json({error:'token invalid to delete'});
        }

        await Blog.deleteOne({_id:req.params.id})
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