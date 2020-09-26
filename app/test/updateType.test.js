var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

describe('Update Type', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Update a Type', async function(){
        var type = await knex('types').select('*').where({name: 'type8'}).first();
        await agent
        .put(`/api/type/${type.id}`)
        .send({name:'type88', environment:'environment88'})
        .expect(200)
        .expect(function(res){
            if (res.body.message.includes('Type Updated.')===false) throw new Error('Test case failed.');
            if (res.body._this.includes(`/api/type/${type.id}`)===false) throw new Error('Test case failed.');
        })
    });

    it('Avoid duplicate entry on update', async function(){
        var type = await knex('types').select('*').where({name: 'type88'}).first();
        await agent
        .put(`/api/type/${type.id}`)
        .send({name:'type11', environment:'environment6'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name already exists.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Environment already exists.')===false) throw new Error('Test case failed.');
        })
    });

    it('Update type with same credentials', async function(){
        var type = await knex('types').select('*').where({name: 'type88'}).first();
        await agent
        .put(`/api/type/${type.id}`)
        .send({name:'type88', environment:'environment88'})
        .expect(200)
        .expect(function(res){
            if (res.body.message.includes('Type Updated.')===false) throw new Error('Test case failed.');
            if (res.body._this.includes(`/api/type/${type.id}`)===false) throw new Error('Test case failed.');
        })
    });

    it('Check if animal type_id is updated also', async function(){
        var type = await knex('types').select('*').where({name: 'type88'}).first();
        var animal = await knex('animals').select('*').where({type_id: type.id}).first();
        await agent
        .get(`/api/animal/${animal.id}`)
        .expect(200)
        .expect(function(res){
            var statusObj = res.body.type;
            if (statusObj.type_id!=type.id) throw new Error('Both type id must be equal.');
        });
    });

    it('Error if empty or incomplete fields on update', async function(){
        var type = await knex('types').select('*').where({name: 'type88'}).first();
        await agent
        .put(`/api/type/${type.id}`)
        .send({name:'', environment:''})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Environment is required.')===false) throw new Error('Test case failed.');
        })
    });

    it('Error if missing fields on update', async function(){
        var type = await knex('types').select('*').where({name: 'type88'}).first();
        await agent
        .put(`/api/type/${type.id}`)
        .send()
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Environment is required.')===false) throw new Error('Test case failed.');
        })
    });

    it('Error if incomplete fields on update', async function(){
        var type = await knex('types').select('*').where({name: 'type88'}).first();
        await agent
        .put(`/api/type/${type.id}`)
        .send({name:'a', environment:'abc'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is too short.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Environment is too short.')===false) throw new Error('Test case failed.');
        })
    });

    it('Error if type id does not exist.', function(done){
        agent
        .put(`/api/type/99`)
        .send({name:'type88', environment:'environment88'})
        .expect(400)
        .expect(['Cannot find type.'], done);
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
        var type = await knex('types').select('*').where({name: 'type88'}).first();
        await agent
        .put(`/api/type/${type.id}`)
        .send({name:'type8', environment:'environment8'})
        .expect(200)
        .expect(function(res){
            if (res.body.message.includes('Type Updated.')===false) throw new Error('Test case failed.');
            if (res.body._this.includes(`/api/type/${type.id}`)===false) throw new Error('Test case failed.');
        })
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Update a type error if unauthenticated', async function(){
        var type = await knex('types').select('*').where({name: 'type8'}).first();
        await agent
        .put(`/api/type/${type.id}`)
        .send({name:'type88', environment:'environment88'})
        .expect(401);
    });
});