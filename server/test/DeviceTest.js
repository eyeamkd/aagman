const chai = require('chai');
const expect = chai.expect;
const should=chai.should;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('createDevice', () => {
    it('Create device', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation {
            createDevice
          }`
          })
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})