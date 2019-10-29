const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require('../models/User');

router.post('/', async (req, res, next) => {
    const body = req.body;

    const user = await User.findOne({username:body.username});
    if (user === null){
        return res.status(401).json({error:"username not found"});
    }

    const passwordCorrect = bcrypt.compare(body.password, user.passwordHash);
    if (!passwordCorrect){
        return res.status(401).json({error:"wrong password"});
    }

    const userForToken = {
        username: user.username,
        id:user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.status(200).send({token, username:user.username, name:user.name});
});

module.exports = router;