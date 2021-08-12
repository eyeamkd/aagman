import { User } from "./../models/user"

export default {
    Query: {
        users:() => User.find(),
        user:(parent, {id}) => User.findById(id),
        userExists: (_, {email}) =>{
            const filter = { email: email }
            const user = User.findOne(filter);
            return user;
        }
    },

    Mutation: {
        createUser: async(_, { email, fullName, phoneNumber }) => {
            const user = new User({ email, fullName, phoneNumber });
            await user.save();
            return user;
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
        }
    }
}