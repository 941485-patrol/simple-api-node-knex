var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);
const Type = require('../models/type');
const Animal = require('../models/animal');

describe('Update Type', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Update a Type', async function(){
        var type = await Type.findOne({name:'type8'});
        await agent
        .put(`/api/type/${type._id}`)
        .send({name:'type88', environment:'environment88'})
        .expect(301)
    });

    it('Avoid duplicate entry on update', async function(){
        var type = await Type.findOne({name:'type88'});
        await agent
        .put(`/api/type/${type._id}`)
        .send({name:'type9', environment:'environment9'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Type name already exists.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Type environment already exists.')===false) throw new Error('Test case failed.');
        })
    });

    it('Update type with same credentials', async function(){
        var type = await Type.findOne({name:'type88'});
        await agent
        .put(`/api/type/${type._id}`)
        .send({name:'type88', environment:'environment88'})
        .expect(301)
    });

    it('Check if animal type_id is updated also', async function(){
        var type = await Type.findOne({name:'type88'});
        var animal = await Animal.findOne({type_id:type._id});
        await agent
        .get(`/api/animal/${animal._id}`)
        .expect(200)
        .expect(function(res){
            var statusObj = res.body.type;
            if (statusObj.type_id!=type._id) throw new Error('Both type id must be equal.');
        });
    });

    it('Error if empty or incomplete fields on update', async function(){
        var type = await Type.findOne({name:'type88'});
        await agent
        .put(`/api/type/${type._id}`)
        .send({name:'', environment:''})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Type name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Environment of animal is required.')===false) throw new Error('Test case failed.');
        })
    });

    it('Error if incomplete fields on update', async function(){
        var type = await Type.findOne({name:'type88'});
        await agent
        .put(`/api/type/${type._id}`)
        .send({name:'a', environment:'abc'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('No type has one letter...')===false) throw new Error('Test case failed.');
            if (res.body.includes('No environment has one letter...')===false) throw new Error('Test case failed.');
        })
    });

    it('Error if type id does not exist.', async function(){
        var type = await Type.findOne({name:'type88'});
        await agent
        .put(`/api/type/0123456789ab`)
        .send({name:'type88', environment:'environment88'})
        .expect(400)
        .expect(['Cannot find type.'])
    });

    it('Error on invalid type id on url.', function(done){
        agent
        .put(`/api/type/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error on whitespace type id on url.', function(done){
        agent
        .put(`/api/type/        `)
        .expect(404, done);
    });

    it('Error on empty string type id on url.', function(done){
        agent
        .put('/api/type/')
        .expect(404, done);
    });

    it('Refresh database', async function(){
        var type = await Type.findOne({name:'type88'});
        await agent
        .put(`/api/type/${type._id}`)
        .send({name:'type8', environment:'environment8'})
        .expect(301);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Update a type error if unauthenticated', async function(){
        var type = await Type.findOne({name:'type8'});
        await agent
        .put(`/api/type/${type._id}`)
        .send({name:'type88', environment:'environment88'})
        .expect(401);
    });
});