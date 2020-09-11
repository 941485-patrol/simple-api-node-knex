var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Status = require('../models/status');
describe('Delete Status', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });
    
    it('Create a Status for deletion', function(done){
        agent
        .post('/api/status')
        .send({name:'status13', description:'description13'})
        .expect(200)
        .expect({'message': 'Status created.'}, done);
    });

    it('Delete a Status', async function(){
        var status = await Status.findOne({name:'status13'});
        await agent
        .delete(`/api/status/${status._id}`)
        .expect(200)
        .expect({'message': 'Status deleted.'});
    });

    it('Error on invalid type id url', function(done){
        agent
        .delete(`/api/status/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error if type id not found', function(done){
        agent
        .delete(`/api/status/0123456789ab`)
        .expect(400)
        .expect(['Error deleting data.'], done);
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
        var status = await Status.findOne({name:'status12'});
        await agent
        .delete(`/api/status/${status._id}`)
        .expect(401);
    });
});