const chai = require('chai');
const expect = chai.expect;
const should=chai.should;
const url = `http://localhost:5000/`;
const request = require('supertest')(url);

describe('displayMenu', () => {
    it('menu Populates and return store data correctly', (done) => {
        request.post('graphql')
        .send({ query: `{
            displayMenu(menuId: "61447a3bce2ffd3bc0f1f720") {
              store {
                id
              }
            }
          }`})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.displayMenu.store.id).to.be.eq("1")
            done();
          })
     })
     it('menu Populates category data correctly', (done) => {
        request.post('graphql')
        .send({ query: `{
            displayMenu(menuId: "61447a3bce2ffd3bc0f1f720") {
              categories {
                name
              }
            }
          }`})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.displayMenu.categories[0].name).to.be.eq("Burger")
            done();
          })
     })


     it('menu Populates item data correctly', (done) => {
        request.post('graphql')
        .send({ query: `{
          displayMenu(menuId:"61447a3bce2ffd3bc0f1f720" ) {
            categories {
              name
              items {
                name
                description
                rating
                availability
                type
                price
                bestSeller
                photo
              }
            }
          }
        }
          `})
        .expect(200)
        .end((err,res) => {
            if (err) return done(err);
            expect(res.body.data.displayMenu.categories[0].items[0].name).to.be.eq("Veg Burger")
            expect(res.body.data.displayMenu.categories[0].items[0].description).to.be.eq("Veg")
            expect(res.body.data.displayMenu.categories[0].items[0].rating).to.be.eq(2)
            expect(res.body.data.displayMenu.categories[0].items[0].availability).to.be.eq("InStock")
            expect(res.body.data.displayMenu.categories[0].items[0].type).to.be.eq("Veg")
            expect(res.body.data.displayMenu.categories[0].items[0].price).to.be.eq(34)
            expect(res.body.data.displayMenu.categories[0].items[0].bestSeller).to.be.eq("Yes")
            expect(res.body.data.displayMenu.categories[0].items[0].photo).to.be.eq("0")
            done();
          })
     })

     it('menu catergory returns all data correctly', (done) => {
      request.post('graphql')
      .send({ query: `{
        displayMenu(menuId: "61447a3bce2ffd3bc0f1f720") {
          categories {
            name
          }
        }
      }`})
      .expect(200)
      .end((err,res) => {
          if (err) return done(err);
          expect(res.body.data.displayMenu.categories.length).to.be.eq(1)
          done();
        })
   })

   it('menu items returns all data correctly', (done) => {
    request.post('graphql')
    .send({ query: `{
      displayMenu(menuId:"61447a3bce2ffd3bc0f1f720" ) {
        categories {
          name
          items {
            name
            description
            rating
            availability
            type
            price
            bestSeller
            photo
          }
        }
      }
    }`})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        expect(res.body.data.displayMenu.categories[0].items.length).to.be.eq(2)
        done();
      })
 })
})

describe('getStoreId', () => {
  it('returns store id from menu id', (done) => {
    request.post('graphql')
    .send({ query: `{
      getStoreId(menuId: "45") {
        store {
          name
          id
        }
      }
    }`})
    .expect(200)
    .end((err,res) => {
        if (err) return done(err);
        expect(res.body.data.getStoreId.store.id).to.be.eq("1")
        done();
      })
  })

})