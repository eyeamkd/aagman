const Timing=require("./../models/Timing");
const Store= require("./../models/Store");


module.exports= {
    Query: {
        //Get all timings
        timings:() => Timing.find(),
        //Get single timing from Id
        timing:(parent, {id}) => Timing.findById(id),
    },

    Mutation: {
       //Create Timing
        createTiming: async(_, { openTime,closeTime,statusTime,storeId }) => {
            const timings = new Timing({ openTime,closeTime,status:statusTime});
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