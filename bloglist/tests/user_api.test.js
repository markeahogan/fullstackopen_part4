const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const http = require('http')
const config = require('../utils/config')
const User = require('../models/User')
const helper = require('./test_helper')

const server = http.createServer(app)

const ins = server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
  })
const api = supertest(ins)

test('appropriate response when password too short', async () => {
    const initialUsers = await helper.getUsers();

    const newUser = {
        name: 'Moe',
        username: 'Kid Presentable',
        password:'mo'
    }
    
    await api.post('/api/users')
    .send(newUser)
    .expect(400)
    //todo check error message

    const newUsers = await helper.getUsers();

    expect(initialUsers.length).toEqual(newUsers.length);
})

afterAll(async () => {
    await mongoose.connection.close()
 })