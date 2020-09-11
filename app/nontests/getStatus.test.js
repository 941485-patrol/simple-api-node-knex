var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Status = require('../models/status');

describe('Get Status', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get one status', async function(){
        var status = await Status.findOne({name: 'status9'});
        await agent
        .get(`/api/status/${status._id}`)
        .expect(200)
        .expect(function(res){
            if (res.body._id != status._id) throw new Error('Test case failed');
        });
    });

    it('Error on invalid url', function(done){
        agent
        .get(`/api/status/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error if status id does not exist', function(done){
        agent
        .get(`/api/status/0123456789ab`)
        .expect(400)
        .expect(['Cannot find status.'], done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on getting status if unauthenticated', async function(){
        var status = await Status.findOne({name: 'status9'});
        await agent
        .get(`/api/status/${status._id}`)
        .expect(401);
    });

});