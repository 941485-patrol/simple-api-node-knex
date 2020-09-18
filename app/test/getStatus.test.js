var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

describe('Get Status', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get one status', async function(){
        var status = await knex('status').select('*').where({id: 9}).first();
        await agent
        .get(`/api/status/${status.id}`)
        .expect(200)
        .expect(function(res){
            if (res.body.id != status.id) throw new Error('Test case failed');
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
        .get(`/api/status/77`)
        .expect(400)
        .expect(['Cannot find status.'], done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on getting status if unauthenticated', async function(){
        var status = await knex('status').select('*').where({id: 9}).first();
        await agent
        .get(`/api/status/${status.id}`)
        .expect(401);
    });

});