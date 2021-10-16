const Menu = require("./../models/Menu");
const Store = require("./../models/Store");
const User = require("./../models/user")
const Device=require("./../models/Device");

module.exports = {
    Query: {
        //Get all menus
        menus: () => Menu.find(),
        //Get single menu by ID
        menu: (parent, { id }) => Menu.findById(id),
        //Display menu alongwith categories,items and store 
        displayMenu: (parent, { menuId }) => {
            return Menu.findById(menuId).populate({
                path: "categories store",
                populate: {
                    path: "items"
                }
            });
        },
        //Get All Categories by Menu ID
        getCategoryByMenuId: (_, { menuId }) => Menu.findById(menuId).populate("categories"),
        //Get Store ID from menuId
        getStoreId: (_, { menuId }) => Menu.findById(menuId).populate("store"),
        //Get token from menuId
        getToken: async (_, { menuId }) => {
            const menu = await Menu.findById(menuId);
            const storeId = menu.store;
            const store = await Store.findById(storeId);
            const userId = store.owner;
            const user = await User.findById(userId)
            const devices = user.devices;
            const tokens = [];
            const resultArray = await Promise.all(devices.map(async (d) =>
                {
                    const device = await Device.findById(d);
                    console.log(device);
                    if(device.active === true)
                    {
                        tokens.push(device.fcmToken);
                    }
                }))
            return tokens;
        }
    },

    Mutation: {
        //Create Menu
        createMenu: async (_, { storeId }) => {
            const menu = new Menu({ store: storeId });
            await menu
                .save().then(result => {
                    return Store.findById(storeId);
                })
                .then(store => {
                    store.menu = menu;
                    return store.save()
                });
            return "Menu Created";
        }
    }
}