require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs/', blogRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*turn into functioning npm with nodemon and mongodb
seperate code into seperate modules*/