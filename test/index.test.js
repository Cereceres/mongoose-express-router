const supertest = require('supertest')
const mongoose = require('mongoose')
const express = require('express')
const assert = require('assert')
var bodyParser = require('body-parser')

const mongooseRouter = require('../index')
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/myapp')
const schema = mongoose.Schema({
    user: String
},{strict: true})
mongoose.model('user', schema)
const router = mongooseRouter(mongoose)
const app = express()
app.use(bodyParser.json())
app.use(router)


const agent = supertest(app)
let user = null

describe('test to router mongoose', () => {
        it('should expose the service from express', async () => {
            const {body} =  await agent.post('/user')
                .send({
                    user: '4'
                })
                .expect(200)
            user = body
            assert(body.user ==='4')
            assert(body._id)
        })
    
        it('should expose the service from express GET', async () => {
            const {body} =  await agent.get('/user')
                .query({
                    user: '4'
                })
                .expect(200)
                console.log('body ', body);
            assert(body[0].user ==='4')
            assert(body[0]._id)
        })
    
        it('should expose the service from express PUT', async () => {
            const {body} =  await agent.put('/user')
                .query({
                    user: '4'
                })
                .send({
                    user: '6'
                })
                .expect(200)
            const updated =await mongoose.models.user.findOne({_id:user._id}).lean().exec()
            assert(updated.user === '6' )
        })
    
        it('should expose the service from express GET', async () => {
            const {body} =  await agent.get('/user/'+user._id.toString())
                .expect(200)
            assert(body[0].user ==='6')
            assert(body[0]._id)
        })
    
        it('should expose the service from express DELETE', async () => {
            const {body} =  await agent.delete('/user/'+user._id.toString())
                .expect(200)
            const removed =await mongoose.models.user.findOne({_id : user._id})
            assert(!removed)
        })

        it('should expose the service from express', async () => {
            const {body} =  await agent.post('/user')
                .send({
                    user: {
                        test:5
                    }
                })
                .expect(400)
        })

    after(async()=>{
        await mongoose.models.user.remove({})
    })

});



