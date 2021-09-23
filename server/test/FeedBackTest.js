const chai = require('chai');
const expect = chai.expect;
const should=chai.should;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('addFeedback', () => {
    it('Add Users Feedback', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($addFeedbackOrderServiceRating: Float!, $addFeedbackDeliveryServiceRating: Float!, $addFeedbackComment: String!, $addFeedbackStoreId: ID!, $addFeedbackOverallStoreRating: Float!, $addFeedbackFoodRating: Float!, $addFeedbackItemsList: [ID]!) {
            addFeedback(orderServiceRating: $addFeedbackOrderServiceRating, deliveryServiceRating: $addFeedbackDeliveryServiceRating, comment: $addFeedbackComment, storeId: $addFeedbackStoreId, overallStoreRating: $addFeedbackOverallStoreRating, foodRating: $addFeedbackFoodRating, itemsList: $addFeedbackItemsList)
          }
          
          `,variables:{
            addFeedbackOrderServiceRating: 4.5, 
            addFeedbackDeliveryServiceRating: 5, 
            addFeedbackComment: "Great Food", 
            addFeedbackStoreId: "1", 
            addFeedbackOverallStoreRating: 3.5, 
            addFeedbackFoodRating: 4, 
            addFeedbackItemsList: ["5","6"]
          }})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})