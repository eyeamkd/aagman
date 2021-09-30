const chai = require('chai');
const expect = chai.expect;
const should=chai.should;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('createNotification', () => {
    it('Create Notification', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation {
            createNotification
          }
          `
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})