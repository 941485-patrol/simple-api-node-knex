var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Animal = require('../models/animal');

describe('Get Animal', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get one animal', async function(){
        var getAnimal = await Animal.findOne({name: 'animal5'});
        await agent
        .get(`/api/animal/${getAnimal._id}`)
        .expect(200)
        .expect(function(res){
            if (res.body._id!=getAnimal._id) throw new Error('Id not equal to url id');
            if (res.body.name!=getAnimal.name) throw new Error('Name not equal to queried name.');
        });
    });

    it('Error on invalid url', function(done){
        agent
        .get(`/api/animal/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error if animal id does not exist', function(done){
        agent
        .get(`/api/animal/0123456789ab`)
        .expect(400)
        .expect(['Cannot find animal.'], done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on getting one animal if unauthenticated', async function(){
        var getAnimal = await Animal.findOne({name: 'animal5'});
        await agent
        .get(`/api/animal/${getAnimal._id}`)
        .expect(401)
    });
});