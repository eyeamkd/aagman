const Store=require("./../models/Store");
const User=require("./../models/user");

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
        }

    }
}