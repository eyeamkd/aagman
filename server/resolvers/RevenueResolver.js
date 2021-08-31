const Revenue=require("./../models/Revenue");
const Store=require("./../models/Store");

module.exports= {
    Query: {
        revenues:() => Revenue.find(),
        revenue:(parent, {id}) => Revenue.findById(id),
    },

    Mutation: {
        createRevenue: async(_, { TotalIncome,StoreId }) => {
            const revenue = new Revenue({TotalIncome,Store:StoreId});
            await revenue
            .save().then(result=>{
                return Store.findById(StoreId);
            })
            .then(store=>{
                store.Revenue=revenue;
                return store.save()
            });
            return "Revenue Created";
        }

    }
}