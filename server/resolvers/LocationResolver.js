const Locations=require("./../models/Location");
const Store=require("./../models/Store");

module.exports= {
    Query: {
        locations:() => Locations.find(),
        location:(parent, {id}) => Locations.findById(id),
    },

     Mutation:{
         
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