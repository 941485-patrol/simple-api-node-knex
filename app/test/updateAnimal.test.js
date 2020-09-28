var app = require('../server');
const request = require('supertest');
const agent = request.agent(app);
const knex = require('../../knex/knex');

describe('Update Animal', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password1234'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Update an animal', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal11').first();
        var type = await knex('types').select('*').where('id',11).first();
        var status = await knex('status').select('*').where('id',11).first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send({name:'animal111', description:'description111', type_id:type.id, status_id:status.id})
        .expect(200)
        .expect(function(res){
            if (res.body.message.includes('Animal Updated.')===false) throw new Error('Test case failed.');
            if (res.body._this.includes(`/api/animal/${animalToUpd.id}`)===false) throw new Error('Test case failed.');
        })
    });

    it('Update an animal again with same credentials', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal111').first();
        var type = await knex('types').select('*').where('id',11).first();
        var status = await knex('status').select('*').where('id',11).first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send({name:'animal111', description:'description111', type_id:type.id, status_id:status.id})
        .expect(200)
        .expect(function(res){
            if (res.body.message.includes('Animal Updated.')===false) throw new Error('Test case failed.');
            if (res.body._this.includes(`/api/animal/${animalToUpd.id}`)===false) throw new Error('Test case failed.');
        })
    });

    // it('Refresh database (bring back original value from seed', async function(){
    //     var animalToUpd = await knex('animals').select('*').where('name', 'animal111').first();
    //     var type = await knex('types').select('*').where('id',4).first();
    //     var status = await knex('status').select('*').where('id',3).first();
    //     await agent
    //     .put(`/api/animal/${animalToUpd.id}`)
    //     .send({name:'animal11', description:'description11', type_id:type.id, status_id:status.id})
    //     .expect(200)
    //     .expect(function(res){
    //         if (res.body.message.includes('Animal Updated.')===false) throw new Error('Test case failed.');
    //         if (res.body._this.includes(`/api/animal/${animalToUpd.id}`)===false) throw new Error('Test case failed.');
    //     })
    // });

    it('Check original status if animal is removed', async function(){
        var status = await knex('status').select('*').where('id',3).first();
        var animal = await knex('animals').select('*').where('id', 11).first();
        await agent
        .get(`/api/status/${status.id}`)
        .expect(200)
        .expect(function(res){
            var animals = res.body.animals;
            var found = animals.filter((anml)=>{
                return animal.id == anml.id
            })
            if (found.length >= 1) throw new Error('Animal id must be removed');
        })
    })
    

    it('Check original type if animal is removed', async function(){
        var type = await knex('types').select('*').where('id',4).first();
        var animal = await knex('animals').select('*').where('id', 11).first();
        await agent
        .get(`/api/type/${type.id}`)
        .expect(200)
        .expect(function(res){
            var animals = res.body.animals;
            var found = animals.filter((anml)=>{
                return animal.id == anml.id
            })
            if (found.length >= 1) throw new Error('Animal id must be removed');
        })
    })

    it('Check updated status animal id', async function(){
        var animal = await knex('animals').select('*').where('id', 11).first();
        var status = await knex('status').select('*').where('id',11).first();
        await agent
        .get(`/api/status/${status.id}`)
        .expect(200)
        .expect(function(res){
            var animals = res.body.animals;
            var found = animals.filter((anml)=>{
                return animal.id == anml.id
            })
            if (found.length == 0) throw new Error('Animal id must be in status.');
            if (found.length > 1) throw new Error('Animal id must not be displayed twice');
        })
    });

    it('Check updated type animal id', async function(){
        var type = await knex('types').select('*').where('id',11).first();
        var animal = await knex('animals').select('*').where('id', 11).first();
        await agent
        .get(`/api/type/${type.id}`)
        .expect(200)
        .expect(function(res){
            var animals = res.body.animals;
            var found = animals.filter((anml)=>{
                return animal.id == anml.id
            })
            if (found.length == 0) throw new Error('Animal id must be in type.');
            if (found.length > 1) throw new Error('Animal id must not be displayed twice');
        })
    });

    it('Delete status to prepare for null test', async function(){
        var status = await knex('status').select('*').where('id',11).first();
        await agent
        .delete(`/api/status/${status.id}`)
        .expect(200)
        .expect({'message': 'Status deleted.'});
    });

    it('Delete type to prepare for null test', async function(){
        var type = await knex('types').select('*').where('id',11).first();
        await agent
        .delete(`/api/type/${type.id}`)
        .expect(200)
        .expect({'message': 'Type deleted.'});
    });

    it('Check updated animal if type/status id is deleted.', async function(){
        var animal = await knex('animals').select('*').where('id', 11).first();
        await agent
        .get(`/api/animal/${animal.id}`)
        .expect(200)
        .expect(function(res){
            if (res.body.status!=null) throw new Error('Status id must be deleted.');
            if (res.body.type!=null) throw new Error('Type id must be deleted.');
        })
    });

    it('Update an animal which has null status/type ids', async function(){
        var animal = await knex('animals').select('*').where('id', 11).first();
        var type = await knex('types').select('*').where('id',4).first();
        var status = await knex('status').select('*').where('id',3).first();
        await agent
        .put(`/api/animal/${animal.id}`)
        .send({name:'animal11', description:'description11', type_id:type.id, status_id:status.id})
    .expect(200)
    .expect(function(res){
        if (res.body.message.includes('Animal Updated.')===false) throw new Error('Test case failed.');
        if (res.body._this.includes(`/api/animal/${animal.id}`)===false) throw new Error('Test case failed.');
    })
    });

    it('Refresh database (Bring back deleted status but id is different)', function(done){
        agent
        .post('/api/status')
        .send({name:'status11', description:'description11'})
        .expect(200)
        .expect({"message": "Status created."}, done);
    });

    it('Refresh database (Bring back deleted type but id is different)', function(done){
        agent
        .post('/api/type')
        .send({name:'type11', environment:'environment11'})
        .expect(200)
        .expect({"message": "Type created"}, done);
    });

    it('Error on whitespace url', function(done){
        agent
        .put('/api/animal/    ')
        .expect(404, done);
    });

    it('Error on empty string url', function(done){
        agent
        .put('/api/animal/')
        .expect(404, done);
    });

    it('Cannot find animal id on animal update', function(done){
        agent
        .put(`/api/animal/45`)
        .expect(400)
        .expect(['Cannot find animal.'], done);
    });

    it('Invalid url on animal update', function(done){
        agent
        .put(`/api/animal/invalid_url`)
        .expect(400)
        .expect(['Invalid Url.'], done);
    });

    it('Existing records on update validation', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal11').first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send({name:'animal12', description:'description9', type_id:animalToUpd.type_id, status_id: animalToUpd.status_id})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name already exists.')==false) throw new Error('Test case failed.');
            if (res.body.includes('Description already exists.')==false) throw new Error('Test case failed.');
        })
    });

    it('Error on empty fields', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal11').first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send({name:'', description:'', type_id:animalToUpd.type_id, status_id: animalToUpd.status_id})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is required.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Description is required.')===false) throw new Error('Test case has failed.');
        })
    });

    it('Error on missing fields', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal11').first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send()
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is required.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Description is required.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Invalid Type ID.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Invalid Status ID.')===false) throw new Error('Test case has failed.');
        })
    });

    it('Error on incomplete fields', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal11').first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send({name:'n', description:'des', type_id:animalToUpd.type_id, status_id: animalToUpd.status_id})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Name is too short.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Description is too short.')===false) throw new Error('Test case has failed.');
        })
    });
    
    it('Error on empty string type/status id', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal11').first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send({name:animalToUpd.name, description:animalToUpd.description, type_id:'', status_id:''})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Invalid Type ID.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Invalid Status ID.')===false) throw new Error('Test case has failed.');
        })
    });

    it('Error on invalid type/status id', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal11').first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send({name:animalToUpd.name, description:animalToUpd.description, type_id:'12345', status_id:'54321'})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Status ID does not exist.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Type ID does not exist.')===false) throw new Error('Test case has failed.');
        })
    });

    it('Error on null type id', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal11').first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send({name:animalToUpd.name, description:animalToUpd.description, type_id:null, status_id:null})
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Invalid Type ID.')===false) throw new Error('Test case has failed.');
            if (res.body.includes('Invalid Status ID.')===false) throw new Error('Test case has failed.');
        })
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on updating animal if unauthenticated', async function(){
        var animalToUpd = await knex('animals').select('*').where('name', 'animal11').first();
        var type = await knex('types').select('*').where('id',4).first();
        var status = await knex('status').select('*').where('id',3).first();
        await agent
        .put(`/api/animal/${animalToUpd.id}`)
        .send({name:'animal111', description:'description111', type_id:type.id, status_id:status.id})
        .expect(401);
    });
})