const Revenue=require("./../models/Revenue");
const Store=require("./../models/Store");

module.exports= {
    Query: {
        revenues:() => Revenue.find(),
        revenue:(parent, {id}) => Revenue.findById(id),
    },

    Mutation: {
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