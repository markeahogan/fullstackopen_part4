const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title:String,
    author:String,
    url:String,
    likes:Number
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = 'mongodb://localhost/bloglist';
mongoose.connect(mongoUrl, {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json());

app.get('/api/blogs', (req, res) => {
    Blog
    .find({})
    .then(blogs => {
        res.json(blogs);
    });
});

app.post('/api/blogs', (req, res) => {
    const blog = new Blog(request.body);

    blog
    .save()
    .then(result => {
        res.status(201).json(result)
    });
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*turn into functioning npm with nodemon and mongodb
seperate code into seperate modules*/