const Device=require("./../models/Device");
const User=require("./../models/user");

module.exports= {
    Query: {
        devices:() => Device.find(),
        device:(parent, {id}) => Device.findById(id),
        checkIfUserWithTokenExists: async (parent, {token, userId}) => {
            const filter = { fcmToken: token, user: userId }
            const isExists = await Device.exists(filter);
            return isExists;
        }
    },

    Mutation: {
        createDevice: async(_, { fcmToken, active, createdAt, userId}) => {
            const device = new Device({fcmToken, active, createdAt, user: userId});
            await device
            .save().then(result=>{
                return User.findById(userId);
            })
            .then(user=>{
                user.devices.push(device);
                return user.save()
            });
            return "Device Created";
        }

    }
}