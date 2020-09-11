var app = require('../server');
const request = require('supertest');
const agent = request.agent(app);

describe('Get Animals', function(){
    it('Get animals page 1', function(done){
        agent
        .get(`/api/animal`)
        .expect(200)
        .expect(function(res){
            if (res.body[0].id != 1) throw new Error('Error');
        }).end(done);
    });

});