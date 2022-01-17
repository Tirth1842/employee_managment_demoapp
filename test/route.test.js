const db = require('../models/User');
const chai = require('chai');
const app = require('../app');
const should = chai.should();
const chaiHttp = require('chai-http');


chai.use(chaiHttp);


describe('employee management', () => {
    beforeEach((done) => { //Before each test we empty the database
       db.query('DELETE FROM test_db')
        .then(() => {
            console.log('deleted successfully')
            done();
        })
    });


    it('get request for home page',(done) => {
        chai.request(app)
         .get('/')
         .end((err,res) => {
            res.should.have.status(200);
            done();
         })
    })

    it('get request for register page',(done) => {

        chai.request(app)
         .get('/users/Register')
         .end((err,res) => {
             res.should.have.status(200);
             done();
         })
    })

    it('get request for login page',(done) => {

        chai.request(app)
         .get('/users/login')
         .end((err,res) => {
             res.should.have.status(200);
             done();
         })
    })

    it('get request for add employee page',(done) => {

        chai.request(app)
         .get('/dashboard/add')
         .end((err,res) => {
             res.should.have.status(200);
             done();
         })
    })

    it('get request for edit employee page with id',(done) => {
        const id = 6;
        chai.request(app)
         .get('/dashboard/'+ id)
         .end((err,res) => {
             res.should.have.status(200);
             res.body.should.be.a('object');
             done();
         })
    })


    it('post request for register page',(done) => {
        const employe = {
            name: 'tirthpatel',
            email: 'tirth@gmail.com',
            password: '123555',
            password2: '123555'
        }
        chai.request(app)
         .post('/users/register')
         .send(employe)
         .end((err,res) => {
             res.should.have.status(200);
             done();
         })
    })

    it('post request for add employe',(done) => {
        const employe = {
            first_name: 'tirth',
            last_name: 'patel',
            email:'tirth@gmail.com'
        }
        chai.request(app)
         .post('/dashboard/add')
         .send(employe)
         .end((err,res) => {
             res.should.have.status(200);
             done();
         })
    })

    it('post request for editing employe with id',(done) => {
        const employe = {
            first_name: 'tirth',
            last_name: 'patel',
            email:'tirth@gmail.com'
        }
        const id = 3
        chai.request(app)
         .post('/dashboard/'+ id)
         .send(employe)
         .end((err,res) => {
             res.should.have.status(200);
             done();
         })
    })



  

})
