
const {MockList} =require('apollo-server')

const orders=[{
    orderCode:"9884",
    orderStatus:"Completed",
    itemsList:[ {
          name:"Cheese Burger",
          quantity:1,
          price:95.5
               },{
                   name:"Veg Burger",
                   quantity:5,
                   price:67.6
               }],
    bill: {
      totalCost:102,
      paymentMode:"DebitCard",
      paymentStatus:"NotPaid"
         }
},{
    orderCode:"3434",
    orderStatus:"OrderReceived",
    itemsList:[ {
          name:"Burger",
          quantity:4,
          price:45.5
               },{
                   name:"Fries",
                   quantity:5,
                   price:34.6
               }],
    bill: {
      totalCost:89,
      paymentMode:"Cash",
      paymentStatus:"Paid"
         }
}]
const mocks={
    User:()=>({
    id:()=>"4",
    email:()=> "greekavi@gmail.com",
    fullName: ()=>"Kavitha jayaraj",
    gstNumber:()=> "KKLKK8989",
    phoneNumber:()=> "12121211212121",
    opt:()=>"3076"
    })
    ,
    Revenue:()=>({
        totalIncome:1000,
        orders:orders
    }),
    CustomerDevice:()=>({
        fcmToken:()=>"esEmCTuCiTS7Gfd5kq9N1F:APA91bFRbmKdeRaKdc7Uvy4AT3LzTpFgqp7V1qizYuHsMZj4YLlgK1h2XpTbq1vs3NL6K40nnCKlwiKqA4yzlT7QvE8F8rUbgwswlUjDxQ952bWjrttHn6LEmfs6Dpekf46EBgE5O24a",
        active:()=>true,
        createdAt:()=>"datetime"
    }),
    Store:()=>({
        id:()=>"1",
        name:()=>"Burger Kitchen",

        orders:()=>orders
    }),
    Order:()=>({
     orderCode:()=>8987,
     orderStatus:()=>"Preparing",
     itemsList:()=>[{
         name:"Lemon Juice",
         quantity:4,
         price:90,
         itemId:"3"
     }],
     store:{
       id:"1",
       name:"Juice stall"
     },
     bill:{
        totalCost:45,
        paymentMode:"UPI",
        paymentStatus:"Paid"
           }

    }),
    Menu:()=>({
        id:()=>"6",
        stores:()=>[{
            id:"1"
        }],
        categories:()=>[{
            name:"Burger",
            items:[{
                id:"13",
                name :"Veg Burger", 
                description :"Veg", 
                availability : "InStock",              
                type: "Veg",                       
                price : 34, 
                rating : 2, 
                bestSeller : "Yes",         
                photo:"0"},
            {
                id:"14",
                name :"Cheese Burger", 
                description :"Veg", 
                availability : "OutOfStock",              
                type: "Veg",                       
                price : 56, 
                rating : 5, 
                bestSeller : "No",         
                photo:"0"

            }]
        },
    ]
    })
  }

  module.exports=mocks