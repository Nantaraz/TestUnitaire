// var chai = require('chai');
// var chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// var assert = require('assert');
// var server = chai.request('http://localhost:8080');
// chai.should();

// describe('/POST Create User',() => {
//     it('Create User Testing',(done) => {
//         let User = {
//             nom:'testblar',
//             prenom:'nevi'
//         }
//         server
//             .post('/profil')
//             .send(User)
//             .end((err,res) => {

//                 res.should.have.status(200);
//                 done()
//             })
//     })

//     it('erreur manque de donnée',(done) => {
//         let user = {
//             'nom':'testblar'
//         }
//         console.log(user.nom);
//         server
//             .post('/profil')
//             .send(user)
//             .end((err,res) => {
//                 res.should.have.status(404);
//                 done()
//             })

//     })
// })



const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('=== Test POST and GET client==', () => {

   // Test POST Client
   describe('HTTP POST /profil', () => {
      it('create client should return the result of data', (done) => {
         chai.request(app)
            .post('/profil')
            // changer les données entrants à chaque test pour eviter les doublants
            .send({
               nom: 'brudnooo',
               prenom: 'marcelincooo'
            })
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.eql(200);
               done();
            });
      });
   });

   // Test GET Client
   describe('HTTTP GET /profil', () => {
      it('get client should return the result', (done) => {
         chai.request(app)
            .get('/profil')
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.eql(200);
               res.type.should.eql('application/json');
               res.body.should.be.a('Array');
               done();
            });
      });
   });

   describe('HTTP PUT /profil', () => {

      it('put client', (done) => {

         chai.request(app)
            .put('/profil')
            .send({ id: '0', nom: 'raz', prenom: 'nanta' })
            .end((err, res) => {

               should.not.exist(err);
               res.status.should.eql(200);
               res.type.should.eql('application/json');
               res.body.should.be.a('Array');
               done();

            });

      });

   })

   describe('HTTP Delete /profil', () => {

         it('delete client', (done) => {

            chai.request(app)
               .delete('/profil')
               .send({id:'0'})
               .end((err, res) => {

                  should.not.exist(err);
                  res.status.should.eql(200);
                  res.type.should.eql('application/json');
                  res.body.should.be.a('Array');
                  done();
   
               });

         })

   })

});
