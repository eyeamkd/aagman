const Timing=require("./../models/Timing");
const Store= require("./../models/Store");


module.exports= {
    Query: {
        stores:() => Timing.find(),
        store:(parent, {id}) => Timing.findById(id),
    },

    Mutation: {
      
        createTiming: async(_, { openTime,closeTime,availability,storeId }) => {
            const timings = new Timing({ openTime,closeTime,});
            await timings
            .save().then(result=>{
                return Store.findById(storeId);
            })
            .then(store=>{
                store.timings=timings;
                return store.save()
            });
            return "Timing Created";
        }

    }
}