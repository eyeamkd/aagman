const User=require("./../models/user");

module.exports= {
    Query: {
        users:() => User.find(),
        user:(parent, {id}) => User.findById(id),
    },

    Mutation: {
        createUser: async(_, { Email, FullName,GSTNumber,PhoneNumber  }) => {
            const user = new User({ Email, FullName, GSTNumber,PhoneNumber ,Stores:[]});
            await user.save();
            return "User Created";
        },
        deleteUser: async (_, {id}) => {
            await User.findByIdAndRemove(id);
            return "User deleted";
        },
        updateOtp: async (_, {email, otp}) => {
            const filter = { email: email }
            const update = { otp: otp };
            const user = await User.findOneAndUpdate(filter,update, {new: true});
            return user;
        },

    }
}