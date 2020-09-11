var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Type = require('../models/type');

describe('Get Type', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get one type', async function(){
        var type = await Type.findOne({name:'type4'});
        await agent
        .get(`/api/type/${type._id}`)
        .expect(200)
        .expect(function(res){
            if (res.body._id != type._id) throw new Error('Test case failed');
        });
    });

    it('Error on invalid url', function(done){
        agent
        .get(`/api/type/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error if type id does not exist', function(done){
        agent
        .get(`/api/type/0123456789ab`)
        .expect(400)
        .expect(['Cannot find type.'], done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Get one type error if unauthenticated', async function(){
        var type = await Type.findOne({name:'type4'});
        await agent
        .get(`/api/type/${type._id}`)
        .expect(401);
    });
});