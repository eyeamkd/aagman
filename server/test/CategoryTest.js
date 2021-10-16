const chai = require('chai');
const expect = chai.expect;
const should=chai.should;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('createCategory', () => {
    it('Create menu category', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($createCategoryName: String!, $createCategoryMenuId: String!) {
            createCategory(name: $createCategoryName, menuId: $createCategoryMenuId)
          }          
          `,variables:{
            createCategoryName: "Main Course", 
            createCategoryMenuId: "9"
          }})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})