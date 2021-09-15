const Menu = require("./../models/Menu");
const Store = require("./../models/Store");
const User = require("./../models/user")
const Device=require("./../models/Device");

module.exports = {
    Query: {
        menus: () => Menu.find(),
        menu: (parent, { id }) => Menu.findById(id),
        displayMenu: (parent, { menuId }) => {
            return Menu.findById(menuId).populate({
                path: "categories store",
                populate: {
                    path: "items"
                }
            });
        },
        getCategoryByMenuId: (_, { menuId }) => Menu.findById(menuId).populate("categories"),
        getStoreId: (_, { menuId }) => Menu.findById(menuId).populate("store"),
        getToken: async (_, { menuId }) => {
            const menu = await Menu.findById(menuId);
            const storeId = menu.store;
            const store = await Store.findById(storeId);
            const userId = store.owner;
            const user = await User.findById(userId)
            const devices = user.devices;
            console.log(user.devices);
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