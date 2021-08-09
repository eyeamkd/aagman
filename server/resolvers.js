import { User } from "./models/user"

export const resolvers = {
    Query: {
        users:() => User.find(),
        user:(parent, {id}) => User.findById(id)
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
        }
    }
}