const db = require('../models/User');
const expect = require('chai').expect;

describe('Connection', function() {
  
    beforeEach(function(done) {
     db.query('DELETE FROM test_db')
      .then(() => {
          db.query('INSERT INTO test_db (username, password, email) VALUES ($1,$2,$3)',['tirth','134','tirth@'])
            .then(() => {
                console.log('inserted data successfully');
                done();
            })
            .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    });
  
    describe('#find()', function() {
      it('respond with matching records', function(done) {
        db.query('SELECT username FROM test_db')
         .then((result) => {
             console.log(result.rows[0].username);
             expect(result.rows[0].username).to.equal('tirth')
             done();
         })
         .catch(err => {console.log(err)})
      });
    });
  });