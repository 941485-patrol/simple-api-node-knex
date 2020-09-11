var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Type = require('../models/type');

describe('Delete Type', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create a Type for deletion', function(done){
        agent
        .post('/api/type')
        .send({name:'type13', environment:'environment13'})
        .expect(200)
        .expect({'message': 'Type created'}, done);
    });

    it('Delete a Type', async function(){
        var type = await Type.findOne({name:'type13'});
        await agent
        .delete(`/api/type/${type._id}`)
        .expect(200)
        .expect({'message': 'Type deleted.'})
    });

    it('Error on invalid type id url', function(done){
        agent
        .delete(`/api/type/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error if type id not found', function(done){
        agent
        .delete(`/api/type/0123456789ab`)
        .expect(400)
        .expect(['Error deleting data.'], done);
    });

    it('Error if empty type id', function(done){
        agent
        .delete(`/api/type/`)
        .expect(404, done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error deleting a type if unauthenticated', async function(){
        var type = await Type.findOne({name:'type4'});
        await agent
        .delete(`/api/type/${type._id}`)
        .expect(401);
    });
});