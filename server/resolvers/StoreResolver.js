const Store=require("./../models/Store");
const User=require("./../models/user");
const Locations=require("./../models/Location");
const Menu=require("./../models/Menu");
const Revenue=require("./../models/Revenue");
const Timing=require("./../models/Timing");


module.exports= {
    Query: {
        stores:() => Store.find(),
        store:(parent, {id}) => Store.findById(id),
        ordersDashboard:(parent,{storeId})=>{
            return Store.findById(storeId).populate({
                path:"orders",
                populate:{
                    path:"bill"
                }
            });
         },
         getMenu:(_,{storeId})=>Store.findById(storeId).populate({
             path:"menu",
             populate:{
                 path:"categories",
                 populate:{
                     path:"items"
                 }
             }
         }),
         getRevenue:(_,{storeId})=>Store.findById(storeId).populate({
             path:"revenue",
             populate:{
                 path:"orders",
                 populate:{
                     path:"bill"
                 }
             }
         })
    },
    

    Mutation: {
        
        createStore: async(_, { name ,userId }) => {
            const store = new Store({ name, Owner:userId});
            await store.save().then(result=>{
                  return User.findById(userId);
            }).then(user=>{
                 user.stores.push(store);
                 return user.save()
            });
            return "Store Created";
        },
        addStore:async(_,{storeName,
                          country ,
                          state,
                          city ,
                          area,
                          landMark,
                          openTime,
                          closeTime,
                          statusTime,
                          userId})=>{

            const store = new Store({ name:storeName, owner:userId});
            User.findById(userId).then(result=>{
                      result.stores.push(store)
                      result.save()
            });
            
            
            const location = new Locations({  country , state, city , area, landMark });
            store.address=location
            await location.save();

            const menu = new Menu({store:store.id});
            store.menu=menu
            await menu.save();

            const revenue = new Revenue({totalIncome:0,store:store.id});
            store.revenue=revenue;
            await revenue.save();

            const timings = new Timing({ openTime,closeTime,status:statusTime});
            store.timings=timings;
            await timings.save();
           
            await store.save();
            return "Store Added"
                          }

    }
}