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

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')  
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blogs have id', async () => {
    const response = await api.get('/api/blogs')  
    expect(response.body[0].id).toBeDefined()
})

test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

afterAll(async () => {
  mongoose.connection.close()
})