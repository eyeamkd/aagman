const Store=require("./../models/Store");
const User=require("./../models/user");

module.exports= {
    Query: {
        stores:() => Store.find(),
        store:(parent, {id}) => Store.findById(id),
        ordersDashboard:(parent,{StoreId})=>{
            return Store.findById(StoreId).populate({
                path:"Orders",
                populate:{
                    path:"Bill"
                }
            });
         }
    },

    Mutation: {
        
        createStore: async(_, { Name ,UserId }) => {
            const store = new Store({ Name, Owner:UserId});
            await store.save().then(result=>{
                  return User.findById(UserId);
            }).then(user=>{
                 user.Stores.push(store);
                 return user.save()
            });
            return "Store Created";
        }

    }
}