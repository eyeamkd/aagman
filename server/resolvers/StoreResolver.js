const Store=require("./../models/Store");
const User=require("./../models/user");
const Locations=require("./../models/Location");
const Menu=require("./../models/Menu");
const Revenue=require("./../models/Revenue");
const Timing=require("./../models/Timing");
const Feedback=require("./../models/Feedback");
const Subcribe=require("./Subscribe");



module.exports= {
    Query: {
        //Get all stores
        stores:() => Store.find(),
        //Get single Store by Id
        store:(parent, {id}) => Store.findById(id),
        //Display Orders from Store ID
        ordersDashboard:(parent,{storeId})=>{
            return Store.findById(storeId).populate({
                path:"orders",
                populate:{
                    path:"bill"
                }
            });
         },
         //Get Menu from store Id
         getMenu:(_,{storeId})=>Store.findById(storeId).populate({
             path:"menu",
             populate:{
                 path:"categories",
                 populate:{
                     path:"items"
                 }
             }
         }),
         //Get Revenue from store id
         getRevenue:(_,{storeId})=>Store.findById(storeId).populate({
             path:"revenue",
             populate:{
                 path:"orders",
                 populate:{
                     path:"bill"
                 }
             }
         }),
         //Get User Id from store Id
         getUserId:(_,{storeId})=>Store.findById(storeId).populate({
             path:"owner"
         })
    },
    

    Mutation: {
        //Create Store
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
        //Create Store 
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

            const store = new Store({ name:storeName, owner:userId,rating:0});
            User.findById(userId).then(result=>{
                      result.stores.push(store)
                      result.save()
            });
            
            //Create Location and map to store
            const location = new Locations({  country , state, city , area, landMark });
            store.address=location
            await location.save();
            
            //Create menu and map to store
            const menu = new Menu({store:store.id});
            store.menu=menu
            await menu.save();

            //Create revenue and map to store
            const revenue = new Revenue({totalIncome:0,store:store.id});
            store.revenue=revenue;
            await revenue.save();

            //Create timings and map to store
            const timings = new Timing({ openTime,closeTime,status:statusTime});
            store.timings=timings;
            await timings.save();
            
            //Create feedback and map to store
            const feedback=new Feedback({orderServiceRating:0,deliveryServiceRating:0,comments:[]});
            store.feedback=feedback
            await feedback.save()
           
            await store.save();
            return "Store Added"
                          }

    },
    Subscription:{
        getRevenue:{
            subscribe:(parent,args,{pubsub})=>{
             const channel=Math.random().toString(36).slice(2,15);
             Subcribe.onMessageUpdates(()=>pubsub.publish(channel,{getRevenue}));
             setTimeout(()=>pubsub.publish(channel,{getRevenue}),0);
             return pubsub.asyncIterator(channel);
            }
        }
    }
}