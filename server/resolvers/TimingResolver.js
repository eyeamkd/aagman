const Timing=require("./../models/Timing");
const Store= require("./../models/Store");


module.exports= {
    Query: {
        stores:() => Timing.find(),
        store:(parent, {id}) => Timing.findById(id),
    },

    Mutation: {
      
        createTiming: async(_, { OpenTime,CloseTime,Availability,StoreId }) => {
            const timings = new Timing({ OpenTime,CloseTime,});
            await timings
            .save().then(result=>{
                return Store.findById(StoreId);
            })
            .then(store=>{
                store.Timings=timings;
                return store.save()
            });
            return "Timing Created";
        }

    }
}