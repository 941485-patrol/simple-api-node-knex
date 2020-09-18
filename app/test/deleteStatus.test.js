var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

describe('Delete Status', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });
    
    it('Create a Status for deletion', function(done){
        agent
        .post('/api/status')
        .send({name:'status99', description:'description99'})
        .expect(200)
        .expect({'message': 'Status created.'}, done);
    });

    it('Delete a Status', async function(){
        var status = await knex('status').select('*').where({name: 'status99'}).first();
        await agent
        .delete(`/api/status/${status.id}`)
        .expect(200)
        .expect({'message': 'Status deleted.'});
    });

    it('Error on invalid status id url', function(done){
        agent
        .delete(`/api/status/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error if status id not found', function(done){
        agent
        .delete(`/api/status/77`)
        .expect(400)
        .expect(['Status ID does not exist.'], done);
    });

    it('Error if empty type id', function(done){
        agent
        .delete(`/api/status/`)
        .expect(404, done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error deleting a status if unauthenticated', async function(){
        var status = await knex('status').select('*').where({name: 'status12'}).first();
        await agent
        .delete(`/api/status/${status.id}`)
        .expect(401);
    });
});