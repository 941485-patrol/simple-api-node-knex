var app = require('../testServer');
const request = require('supertest');
const agent = request.agent(app);

describe('Get Animals', function(){
    it('Login first', function(done){
        agent
        .post('/api/user/login')
        .send({username:'username', password:'Password123'})
        .expect(200)
        .expect({"message": "You are now logged in."}, done);
    });

    it('Get animals page 1', function(done){
        agent
        .get(`/api/animal`)
        .expect(200)
        .expect(function(res){
            if (res.body.hasPrev != false) throw new Error('Page 1 must be hasPrev false');
            if (res.body.hasNext != true) throw new Error('Page 1 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Get animals page 2', function(done){
        agent
        .get(`/api/animal/?page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.hasPrev != true) throw new Error('Page 2 must be hasPrev true');
            if (res.body.hasNext != true) throw new Error('Page 2 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Get all animals page 3', function(done){
        agent
        .get(`/api/animal/?page=3`)
        .expect(200)
        .expect(function(res){
            if (res.body.hasPrev != true) throw new Error('Page 3 must be hasPrev true');
            if (res.body.hasNext != false) throw new Error('Page 3 must be hasNext false');
            if (res.body.results.length != 2) throw new Error('Results must be two');
        }).end(done);
    });

    it('No data if page out of range', function(done){
        agent
        .get(`/api/animal/?page=4`)
        .expect(200)
        .expect(function(res){
            if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });

    it('Sort animals by name desc page 1', function(done){
        agent
        .get(`/api/animal/?sort=-name`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name!='animal9') throw new Error('Must be animal9.');
            if (res.body.hasPrev != false) throw new Error('Page 1 must be hasPrev false');
            if (res.body.hasNext != true) throw new Error('Page 1 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });
    
    it('Sort animals by description asc page 2', function(done){
        agent
        .get(`/api/animal/?page=2&sort=description`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[4].description!='description7') throw new Error('Must be description7.');
            if (res.body.hasPrev != true) throw new Error('Page 2 must be hasPrev true');
            if (res.body.hasNext != true) throw new Error('Page 1 must be hasNext true');
            if (res.body.results.length != 5) throw new Error('Results must be five');
        }).end(done);
    });

    it('Sort animals by name desc page 3', function(done){
        agent
        .get(`/api/animal/?sort=-name&page=3`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='animal10') throw new Error('Must be animal10');
            if (res.body.hasPrev != true) throw new Error('Page 3 must be hasPrev true');
            if (res.body.hasNext != false) throw new Error('Page 3 must be hasNext true');
            if (res.body.results.length != 2) throw new Error('Results must be five');
        }).end(done);
    });
    
    it('Error on sorting page out of range', function(done){
        agent
        .get(`/api/animal/?sort=-description&page=4`)
        .expect(200)
        .expect(function(res){
            if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
        }).end(done);
    });
    
    it('Search animals', function(done){
        agent
        .get(`/api/animal/?s=animal5`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='animal5') throw new Error('Must be animal5');
        }).end(done);
    });

    it('Search animals case insensitive', function(done){
        agent
        .get(`/api/animal/?s=aNiMaL5`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='animal5') throw new Error('Must be animal5');
        }).end(done);
    });

    it('SearchSort by name desc page 2', function(done){
        agent
        .get(`/api/animal/?sort=-name&s=anim&page=2`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].name !='animal4') throw new Error('Must be animal4');
        }).end(done);
    });

    it('SearchSort by description asc page 3 case insensitive', function(done){
        agent
        .get(`/api/animal/?s=AnIm&page=3&sort=description`)
        .expect(200)
        .expect(function(res){
            if (res.body.results[0].description !='description8') throw new Error('Must be description8');
        }).end(done);
    });

    // it('No data message if there is no animals inserted', function(done){
    //     await Animal.deleteMany();
    //     agent
    //     .get(`/api/animal`)
    //     .expect(200)
    //     .expect(function(res){
    //         
    //         if (res.body.results.message != 'No data.') throw new Error ('Should be "No data."');
    //     })
    // });

    it('Error if page query is not numeric', function(done){
        agent
        .get(`/api/animal/?page=two`)
        .expect(400)
        .expect(['Page must be a number.'], done);
    });
    
    it('Error if page query is zero', function(done){
        agent
        .get(`/api/animal/?page=0`)
        .expect(400)
        .expect(['Page must be not less than 1.'], done);
    });

    it('Error if page number is negative', function(done){
        agent
        .get(`/api/animal/?page=-2340`)
        .expect(400)
        .expect(['Page must be not less than 1.'], done);
    });

    it('Sorting error (wrong asc sort key)', function(done){
        agent
        .get(`/api/animal/?sort=namek`)
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('Sorting error (wrong desc sort key)', function(done){
        agent
        .get(`/api/animal/?sort=-descriptor`)
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('Sorting error (double underscore)', function(done){
        agent
        .get(`/api/animal/?sort=__id`)
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('SortPage error (wrong sort key)', function(done){
        agent
        .get(`/api/animal/?sort=namek&page=2`)
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Invalid sort field.')==false) throw new Error ('Must have sorting error msg');
        }).end(done);
    });

    it('SortPage error (wrong page and sort key)', function(done){
        agent
        .get(`/api/animal/?sort=-descriptore&page=negativeOne`)
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Page must be a number.')==false) throw new Error ('Must have paging error msg');
        }).end(done);
    });

    it('SortPage error (wrong sortkey and page zero)', function(done){
        agent
        .get(`/api/animal/?page=0&sort=__id`)
        .expect(400)
        .expect(function(res){
            if (res.body.includes('Page must be not less than 1.')==false) throw new Error ('Must have paging error msg');
        }).end(done);
    });

    it('SearchSortPage error (wrong sortkey)', function(done){
        agent
        .get('/api/animal/?sort=namek&page=2&s=AniMaL')
        .expect(400)
        .expect(['Invalid sort field.'], done);
    });

    it('SearchSortPage error (searchkey not found)', function(done){
        agent
        .get('/api/animal/?sort=-name&page=3&s=bAnimAL')
        .expect(200)
        .expect({"results": {"message": 'No data.'}}, done);
    });

    it('SearchSortPage error (wrong page)', function(done){
        agent
        .get('/api/animal/?sort=-name&page=0&s=animal')
        .expect(400)
        .expect(['Page must be not less than 1.'], done);
    });

    it('SearchSortPage error (wrong page, sortkey and searchkey)', function(done){
        agent
        .get('/api/animal/?sort=desckription&page=-2&s=people')
        .expect(400)
        .expect(['Page must be not less than 1.'], done); //Page validation error will display first.
    });

    it('Logout then', function(done){
        agent
        .get('/api/user/logout')
        .expect({"message":"You are now logged out."}, done);
    });

    it('Error on getting animals if unauthenticated', function(done){
        agent
        .get(`/api/animal/?page=2`)
        .expect(401, done);
    });
});