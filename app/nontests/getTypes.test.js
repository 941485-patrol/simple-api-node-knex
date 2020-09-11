var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);

describe('Get Types', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get all types page 1', function(done){
        agent
        .get(`/api/type`)
        .expect(200)
        .expect(function(res){
            if (res.body.hasPrev != false) throw new Error('Page 1 must be hasPrev false');
            if (res.body.hasNext != true) throw new Error('Page 1 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Get all types page 2', function(done){
        agent
        .get(`/api/type/?page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.hasPrev != true) throw new Error('Page 2 must be hasPrev true');
            if (res.body.hasNext != true) throw new Error('Page 2 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Get all types page 3', function(done){
        agent
        .get(`/api/type/?page=3`)
        .expect(200)
        .expect(function(res){
            if (res.body.hasPrev != true) throw new Error('Page 3 must be hasPrev true');
            if (res.body.hasNext != false) throw new Error('Page 3 must be hasNext false');
            if (res.body.results.length != 2) throw new Error('Results must be two');
        }).end(done);
    });

    it('Get all types page 4 (no data)', function(done){
        agent
        .get(`/api/type/?page=4`)
        .expect(200)
        .expect(function(res){
            if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    it('Sort types (name desc)', function(done){
        agent
        .get(`/api/type/?sort=-name`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name!='type9') throw new Error('Must be type9.');
            if (res.body.hasPrev != false) throw new Error('Page 1 must be hasPrev false');
            if (res.body.hasNext != true) throw new Error('Page 1 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Sort types (environment desc)', function(done){
        agent
        .get(`/api/type/?page=2&sort=-environment`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[4].environment!='environment11') throw new Error('Must be environment11.');
            if (res.body.hasPrev != true) throw new Error('Page 2 must be hasPrev true');
            if (res.body.hasNext != true) throw new Error('Page 1 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Sort types (environment asc)', function(done){
        agent
        .get(`/api/type/?sort=environment&page=3`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='type8') throw new Error('Must be type8');
            if (res.body.hasPrev != true) throw new Error('Page 3 must be hasPrev true');
            if (res.body.hasNext != false) throw new Error('Page 3 must be hasNext true');
            if (res.body.results.length != 2) throw new Error('Results must be five');
        }).end(done);
    });

    it('Sort types (no data)', function(done){
        agent
        .get(`/api/type/?sort=-name&page=4`)
        .expect(200)
        .expect(function(res){
            if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    it('Search types', function(done){
        agent
        .get(`/api/type/?s=type4`)
        .expect(200)
        .expect(function(res){      
            if (res.body.results[0].name !='type4') throw new Error('Must be type4');
        }).end(done);
    });

    it('Search types case insensitive', function(done){
        agent
        .get(`/api/type/?s=tYpE5`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='type5') throw new Error('Must be type5');
        }).end(done);
    });

    it('Search types no data', function(done){
        agent
        .get(`/api/type/?s=tayp5`)
        .expect(200)
        .expect(function(res){
            if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    it('Search types with sort and pagination', function(done){
        agent
        .get(`/api/type/?sort=-name&s=type&page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='type4') throw new Error('Must be type4');
        }).end(done);
    });

    it('Search types with sort and pagination case insensitive', function(done){
        agent
        .get(`/api/type/?s=tYp&page=3&sort=name`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='type8') throw new Error('Must be type8');
        }).end(done);
    });

    it('Search types with sort and pagination no data', function(done){
        agent
        .get(`/api/type/?s=nAm&page=3&sort=name`)
        .expect(200)
        .expect(function(res){
            if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    // it('No data message if there is no type inserted', function(done){
    //     await Type.deleteMany();
    //     agent
    //     .get(`/api/type`)
    //     .expect(200)
    //     .expect(function(res){
            
    //         if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
    //     })
    // });

    it('Paging error (not a digit)', function(done){
        agent
        .get(`/api/type/?page=two`)
        .expect(400)
        .expect(['Page must be a number.'], done);
    });

    it('Paging error (zero)', function(done){
        agent
        .get(`/api/type/?page=0`)
        .expect(400)
        .expect(['Page must be not less than 1.'], done);
    });

    it('Paging error (negative)', function(done){
        agent
        .get(`/api/type/?page=-2340`)
        .expect(400)
        .expect(['Page must be not less than 1.'], done);
    });

    it('Sorting error (wrong asc sort key)', function(done){
        agent
        .get(`/api/type/?sort=namek`)
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('Sorting error (wrong desc sort key)', function(done){
        agent
        .get(`/api/type/?sort=-environmentor`)
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('Sorting error (double underscore)', function(done){
        agent
        .get(`/api/type/?sort=__id`)
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('Sorting and paging error (wrong sortkey)', function(done){
        agent
        .get(`/api/type/?sort=namek&page=2`)
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Invalid sort field.')==false) throw new Error ('Must have sorting error msg');
        }).end(done);
    });

    it('Sorting and paging error (wrong sortkey and page not a digit)', function(done){
        agent
        .get(`/api/type/?sort=-environmentor&page=negativeOne`)
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Page must be a number.')==false) throw new Error ('Must have paging error msg');
        }).end(done);
    });

    it('Sorting and paging error (zero page and double underscore sortkey)', function(done){
        agent
        .get(`/api/type/?page=0&sort=__id`)
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Page must be not less than 1.')==false) throw new Error ('Must have paging error msg');
        }).end(done);
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Get all types error if unauthenticated', function(done){
        agent
        .get(`/api/type/?page=3`)
        .expect(401, done);
    });
});