const { User } = require("./models/user")

const resolvers = {
    Query: {
        users:() => User.find()
    },

    Mutation: {
        createUser: async(_, { email, fullName, phoneNumber }) => {
            const user = new User({ email, fullName, phoneNumber });
            await user.save();
            return user;
        }
    }
}

module.exports = {resolvers}