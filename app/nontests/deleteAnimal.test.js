var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Type = require('../models/type');
const Animal = require('../models/animal');
const Status = require('../models/status');

describe('Delete Animal', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Create an animal for deletion', async function(){
        var type = await Type.findOne({name:'type5'});
        var status = await Status.findOne({name:'status6'});
        await agent
        .post('/api/animal')
        .send({name:'myname', description: 'mydescription', type_id: type._id, status_id: status._id})
        .expect(200)
        .expect({"message": "Animal created"});
    });

    it('Delete an animal', async function(){
        var newAnimal = await Animal.findOne({name: 'myname'});
        await agent
        .delete(`/api/animal/${newAnimal._id}`)
        .expect(200)
        .expect({'message': 'Animal deleted.'});
    });

    it('Deleted animal is not present on type listing', async function(){
        var type = await Type.findOne({name:'type5'});
        await agent
            .get(`/api/type/${type._id}`)
            .expect(200)
            .expect(function(res){
                var animals = res.body.animals;
                if (animals.length != 0) throw new Error('Animal id must be pulled.');
            });
    });

    it('Deleted animal is not present on status listing', async function(){
        var status = await Status.findOne({name:'status6'});
        await agent
            .get(`/api/status/${status._id}`)
            .expect(200)
            .expect(function(res){
                var animals = res.body.animals;
                if (animals.length != 0) throw new Error('Animal id must be pulled.');
            });
    });

    it('Error if wrong type id in url', function(done){
        agent
        .delete(`/api/animal/0123456789ab`)
        .expect(400)
        .expect(['Error deleting data.'], done);
    });

    it('Error if empty string type id on url', function(done){
        agent
        .delete(`/api/animal/`)
        .expect(404, done);
    });

    it('Error if whitespace type id on url', function(done){
        agent
        .delete(`/api/animal/    `)
        .expect(404, done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on deleting an animal if authenticated', async function(){
        var newAnimal = await Animal.findOne({name: 'animal1'});
        await agent
        .delete(`/api/animal/${newAnimal._id}`)
        .expect(401);
    });
    
});