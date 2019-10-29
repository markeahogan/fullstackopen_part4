const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
    {
        title:"Title1",
        author:"Author1",
        url:"Url1",
        likes:1
    },
    {
        title:"Title2",
        author:"Author2",
        url:"Url2",
        likes:2
    }
]

const getBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const getUsers = async () => {
    const users = await User.find({})
    return users.map(x => x.toJSON())
  }

module.exports = {
    initialBlogs, getBlogs, getUsers
}