const Locations=require("./../models/Location");
const Store=require("./../models/Store");

module.exports= {
    Query: {
        //Get all locations
        locations:() => Locations.find(),
        //get single location by ID
        location:(parent, {id}) => Locations.findById(id),
    },

     Mutation:{
         //Create Location
        createLocation: async(_, { country , state, city , area, landMark,storeId }) => {
            const location = new Locations({  country , state, city , area, landMark });
            await location.save().then(result=>{
                return Store.findById(storeId);
            })
            .then(store=>{
               store.address=location;
               store.save(); 
            })
            return "Location Created";
        }
     }
}