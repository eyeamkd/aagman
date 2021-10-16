const Revenue=require("./../models/Revenue");
const Store=require("./../models/Store");

module.exports= {
    Query: {
        //Get all revenues
        revenues:() => Revenue.find(),
        //Get single revenue by Id
        revenue:(parent, {id}) => Revenue.findById(id),
    },

    Mutation: {
        //Create Revenue
        createRevenue: async(_, { totalIncome,storeId }) => {
            const revenue = new Revenue({totalIncome,Store:storeId});
            await revenue
            .save().then(result=>{
                return Store.findById(storeId);
            })
            .then(store=>{
                store.revenue=revenue;
                return store.save()
            });
            return "Revenue Created";
        }

    }
}