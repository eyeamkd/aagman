const Menu=require("./../models/Menu");
const Store=require("./../models/Store");

module.exports= {
    Query: {
        menus:() => Menu.find(),
        menu:(parent, {id}) => Menu.findById(id),
        displayMenu:(parent,{menuId})=>{
            return Menu.findById(menuId).populate({
                path:"categories store",
                populate:{
                    path:"items"
                }
            });
         },
         getCategoryByMenuId:(_,{menuId})=>Menu.findById(menuId).populate("categories"),
         getStoreId:(_,{menuId})=>Menu.findById(menuId).populate("store")
    },

    Mutation: {
        createMenu: async(_, { storeId }) => {
            const menu = new Menu({store:storeId});
            await menu
            .save().then(result=>{
                return Store.findById(storeId);
            })
            .then(store=>{
                store.menu=menu;
                return store.save()
            });
            return "Menu Created";
        }
    }
}