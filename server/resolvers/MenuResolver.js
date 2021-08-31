const Menu=require("./../models/Menu");
const Store=require("./../models/Store");

module.exports= {
    Query: {
        menus:() => Menu.find(),
        menu:(parent, {id}) => Menu.findById(id),
        displayMenu:(parent,{MenuId})=>{
            return Menu.findById(MenuId).populate({
                path:"Categories",
                populate:{
                    path:"Items"
                }
            });
         }
    },

    Mutation: {
        createMenu: async(_, { StoreId }) => {
            const menu = new Menu({Store:StoreId});
            await menu
            .save().then(result=>{
                return Store.findById(StoreId);
            })
            .then(store=>{
                store.Menu=menu;
                return store.save()
            });
            return "Menu Created";
        }
    }
}