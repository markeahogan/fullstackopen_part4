const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/', async (req, res, next) =>{
    try{
        const result = await User.find({}).populate('blogs', {url:1, title:1, author:1});
        res.json(result);
    }
    catch(e){
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    const {name, username, password} = req.body;
    
    if (password.length < 3){
        res.status(400).json({error:"password must be at least 3 characters"});
        return;
    }
    
    const passwordHash = await bcrypt.hash(password, 10);

    const userData = {
        name,
        username,
        passwordHash
    }

    const user = new User(userData);
    try{
        const r = await user.save();
        res.status(201).json(r);
    }
    catch(e){
        next(e);
    }
});

module.exports = router