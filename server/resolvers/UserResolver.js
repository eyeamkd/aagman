const User=require("./../models/user");

module.exports= {
    Query: {
        users:() => User.find(),
        user:(parent, {id}) => User.findById(id),
        checkIfUserExists:(_,{email}) => User.exists({ email: email }),
        checkIfOtpMatches: async (_, {email, otp}) => {
            const user = await User.findOne({ email: email });
            if(user.otp === otp)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    },

    Mutation: {
        createUser: async(_, { email, fullName,gstNumber,phoneNumber  }) => {
            const user = new User({ email, fullName, gstNumber,phoneNumber ,stores:[]});
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
            const user = await User.findOneAndUpdate(filter,update, {new: true, useFindAndModify: false});
            return user;
        },

    }
}