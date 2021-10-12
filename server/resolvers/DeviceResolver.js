const Device=require("./../models/Device");
const User=require("./../models/user");

module.exports= {
    Query: {
        //Get all devices
        devices:() => Device.find(),
        //Get single device by ID
        device:(parent, {id}) => Device.findById(id),
        //Check if User has token already
        checkIfUserWithTokenExists: async (parent, {token, userId}) => {
            const filter = { fcmToken: token, user: userId }
            const isExists = await Device.exists(filter);
            return isExists;
        }
    },

    Mutation: {
        //create device
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
        },
        //delete Device
        deleteDevice: async(_, { fcmToken }) => {
            const devices = await Device.find({fcmToken: fcmToken});
            devices.map(async (device) =>{
                console.log(device);
                console.log(device.user);
                User.findById(device.user).then(async (user) =>{
                    user.devices.pop(device._id);
                    user.save();
                    await Device.findByIdAndDelete(device._id);
                })
            })
            return "Device Deleted";
        }
    }
}