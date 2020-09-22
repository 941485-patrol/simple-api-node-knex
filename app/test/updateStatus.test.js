var app = require('../server');
const request = require('supertest');
const knex = require('../../knex/knex');
const agent = request.agent(app);

describe('Update Status', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Update a Status', async function(){
        var status = await knex('status').select('*').where({name: 'status9'}).first();
        await agent
        .put(`/api/status/${status.id}`)
        .send({name:'status99', description:'description99'})
        .expect(301);
    });

    it('Avoid duplicate entry on update', async function(){
        var status = await knex('status').select('*').where({name: 'status99'}).first();
        await agent
        .put(`/api/status/${status.id}`)
        .send({name:'status10', description:'description10'})
        .expect(400)
        .expect(function (res){
            if (res.body.includes('Name already exists.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Description already exists.')===false) throw new Error('Test case failed.');
        })
    });

    it('Update status with same credentials', async function(){
        var status = await knex('status').select('*').where({name: 'status99'}).first();
        await agent
        .put(`/api/status/${status.id}`)
        .send({name:'status99', description:'description99'})
        .expect(301);
    });

    it('Check if animal status_id is updated also', async function(){
        var status = await knex('status').select('*').where({name: 'status99'}).first();
        var animal = await knex('animals').select('*').where({status_id: status.id}).first();
        await agent
        .get(`/api/animal/${animal.id}`)
        .expect(200)
        .expect(function(res){
            var statusObj = res.body.status;
            if (statusObj.status_id!=status.id) throw new Error('Both status id must be equal.');
        });
    });

    it('Error if empty or incomplete fields on update', async function(){
        var status = await knex('status').select('*').where({name: 'status99'}).first();
        await agent
        .put(`/api/status/${status.id}`)
        .send({name:'', description:''})
        .expect(400)
        .expect(function (res){
            if (res.body.includes('Name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Description is required.')===false) throw new Error('Test case failed.');
        });
    });

    it('Error if missing fields on update', async function(){
        var status = await knex('status').select('*').where({name: 'status99'}).first();
        await agent
        .put(`/api/status/${status.id}`)
        .send({})
        .expect(400)
        .expect(function (res){
            if (res.body.includes('Name is required.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Description is required.')===false) throw new Error('Test case failed.');
        });
    });

    it('Error if incomplete fields on update', async function(){
        var status = await knex('status').select('*').where({name: 'status99'}).first();
        await agent
        .put(`/api/status/${status.id}`)
        .send({name:'a', description:'abc'})
        .expect(400)
        .expect(function (res){
            if (res.body.includes('Name is too short.')===false) throw new Error('Test case failed.');
            if (res.body.includes('Description is too short.')===false) throw new Error('Test case failed.');
        });
    });

    it('Error if status id on url does not exist.', function(done){
        agent
        .put(`/api/status/88`)
        .send({name:'someName', description:'someDescription'})
        .expect(400)
        .expect(['Cannot find status.'], done);
    });

    it('Error on invalid status id on url.', function(done){
        agent
        .put(`/api/status/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Error on whitespace status id on url.', function(done){
        agent
        .put(`/api/type/        `)
        .expect(404, done);
    });

    it('Error on empty string status id on url.', function(done){
        agent
        .put(`/api/type/`)
        .expect(404, done);
    });

    it('Refresh database', async function(){
        var status = await knex('status').select('*').where({name: 'status99'}).first();
        await agent
        .put(`/api/status/${status.id}`)
        .send({name:'status9', description:'description9'})
        .expect(301);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on updating a status if unauthenticated', async function(){
        var status = await knex('status').select('*').where({name: 'status9'}).first();
        agent
        .put(`/api/status/${status.id}`)
        .send({name:'status99', description:'description99'})
        .expect(401);
    });

});