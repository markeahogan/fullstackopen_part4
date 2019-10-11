const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const http = require('http')
const config = require('../utils/config')
const Blog = require('../models/Blog')
const helper = require('./test_helper')

const server = http.createServer(app)

const ins = server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
  })
const api = supertest(ins)

beforeEach(async () => {
    await Blog.deleteMany({})

    for(let i = 0; i < helper.initialBlogs.length; i++){
        const blog = new Blog(helper.initialBlogs[i]);
        await blog.save();
    }
})

test('the blog list application returns the correct amount of blog posts in the JSON format', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')  
    expect(response.body[0].id).toBeDefined()
})

test('making an HTTP POST request to the /api/blogs url successfully creates a new blog post', async () => {
    const newBlog = {
        title: 'new blog',
        author: 'new author',
        url:'new url',
        likes:'0'
    }
    
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const newBlogs = await helper.getBlogs()
    expect(newBlogs.length).toBe(helper.initialBlogs.length + 1)  

    expect(newBlogs[newBlogs.length-1].title).toBe(newBlog.title);
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
        title: 'new blog',
        author: 'new author',
        url:'new url'
    }
    
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const newBlogs = await helper.getBlogs()
    expect(newBlogs[newBlogs.length-1].likes).toBe(0);
})

afterAll(async () => {
  mongoose.connection.close()
})