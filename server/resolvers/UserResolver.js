const User=require("./../models/user");
const Store=require("./../models/Store");
const Locations=require("./../models/Location");
const Menu=require("./../models/Menu");
const Revenue=require("./../models/Revenue");
const Timing=require("./../models/Timing");

module.exports= {
    Query: {
        users:() => User.find(),
        user:(parent, {id}) => User.findById(id),
        getUserStoreId:(_,{email})=>{
             const user=User.findOne({email:email});
             return user.populate("stores")  
        },
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
        addUser: async(_,{email,
                         fullName,
                         gstNumber,
                         phoneNumber,
                         storeName,
                         country ,
                         state,
                         city ,
                         area,
                         landMark,
                         openTime,
                         closeTime,
                         statusTime
                        })=>{
            const user= new User({email,fullName,gstNumber,phoneNumber});
            

            const store = new Store({ name:storeName, owner:user.id});
            user.stores.push(store);
            await user.save();
            
            const location = new Locations({  country , state, city , area, landMark });
            store.address=location
            await location.save();

            const menu = new Menu({store:store.id});
            store.menu=menu
            await menu.save();

            const revenue = new Revenue({totalIncome:0,store:store.id});
            store.revenue=revenue;
            await revenue.save();

            const timings = new Timing({ openTime,closeTime,status:statusTime});
            store.timings=timings;
            await timings.save();
           
            await store.save();
            return "User Created"
            

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