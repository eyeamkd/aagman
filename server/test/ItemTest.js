const chai = require('chai');
const expect = chai.expect;
const should=chai.should;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('createItem', () => {
    it('Create menu item', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($createItemName: String!, $createItemDescription: String!, $createItemAvailability: ItemAvailability!, $createItemType: Type!, $createItemPrice: Float!, $createItemRating: Float!, $createItemBestSeller: BestSellerItem!, $createItemPhoto: String!, $createItemCategoryId: ID!) {
            createItem(name: $createItemName, description: $createItemDescription, availability: $createItemAvailability, type: $createItemType, price: $createItemPrice, rating: $createItemRating, bestSeller: $createItemBestSeller, photo: $createItemPhoto, categoryId: $createItemCategoryId)
          }
          
          `,variables:{
            createItemName: "Lemon Juice", 
            createItemDescription: "Lemon", 
            createItemAvailability: "InStock", 
            createItemType: "Veg", 
            createItemPrice: 67.3, 
            createItemRating: 0, 
            createItemBestSeller: "Yes", 
            createItemPhoto: "0", 
            createItemCategoryId: "13"
          }})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})

describe('updateItem', () => {
    it('To update a menu Item', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($updateItemName: String!, $updateItemDescription: String!, $updateItemAvailability: ItemAvailability!, $updateItemType: Type!, $updateItemPrice: Float!, $updateItemRating: Float!, $updateItemBestSeller: BestSellerItem!, $updateItemPhoto: String!, $updateItemItemId: ID!) {
            updateItem(name: $updateItemName, description: $updateItemDescription, availability: $updateItemAvailability, type: $updateItemType, price: $updateItemPrice, rating: $updateItemRating, bestSeller: $updateItemBestSeller, photo: $updateItemPhoto, itemId: $updateItemItemId)
          }          
          `,variables:{
            updateItemName: "Lemon Juice", 
            updateItemDescription: "Sweet Lemon", 
            updateItemAvailability: "OutOfStock", 
            updateItemType: "Veg", 
            updateItemPrice: 30, 
            updateItemRating: 4.5, 
            updateItemBestSeller: "Yes", 
            updateItemPhoto: "0", 
            updateItemItemId: "13"
          }})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})

describe('deleteItem', () => {
    it('To delete a menu Item', (done) => {
        request.post('graphql')
        .send({ query: `mutation Mutation($deleteItemItemId: ID!, $deleteItemCategoryId: ID!) {
            deleteItem(itemId: $deleteItemItemId, categoryId: $deleteItemCategoryId)
          }
                   
          `,variables:{
            deleteItemItemId: "14", 
            deleteItemCategoryId: "15"
          }})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            done();
          })
     })
})