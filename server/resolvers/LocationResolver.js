const Locations=require("./../models/Location");
const Store=require("./../models/Store");

module.exports= {
    Query: {
        locations:() => Locations.find(),
        location:(parent, {id}) => Locations.findById(id),
    },

     Mutation:{
         
        createLocation: async(_, { Country , State, City , Area, LandMark,StoreId }) => {
            const location = new Locations({  Country , State, City , Area, LandMark });
            await location.save().then(result=>{
                return Store.findById(StoreId);
            })
            .then(store=>{
               store.Address=location;
               store.save(); 
            })
            return "Location Created";
        }
     }
}