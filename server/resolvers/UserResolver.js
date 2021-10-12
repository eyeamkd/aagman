const User=require("./../models/user");
const Store=require("./../models/Store");
const Locations=require("./../models/Location");
const Menu=require("./../models/Menu");
const Revenue=require("./../models/Revenue");
const Timing=require("./../models/Timing");
const Feedback=require("./../models/Feedback");
module.exports= {
    Query: {
        //Get all users
        users:() => User.find(),
        //Get single user from Id
        user:(parent, {id}) => User.findById(id),
        //Get Store Id from Email
        getUserStoreId: (_,{email})=>{
             const user=User.findOne({email:email});

             
             return user.populate("stores")  
        },
        //Get User from Email ID
        getUserByMail: async (_,{email})=>{
            const user = await User.findOne({ email: email });
            return user;
        },
        //Check if User Exists
        checkIfUserExists:(_,{email}) => User.exists({ email: email }),
        //Check if users otp matches
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
        //Create User
        createUser: async(_, { email, fullName,gstNumber,phoneNumber  }) => {
            const user = new User({ email, fullName, gstNumber,phoneNumber ,stores:[]});
            await user.save();
            return "User Created";
        },
        //Add new User
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

            //Create Store and map to user
            const store = new Store({ name:storeName, owner:user.id,rating:0});
            user.stores.push(store);
            await user.save();
            
            //Create Location and map to store
            const location = new Locations({  country , state, city , area, landMark });
            store.address=location
            await location.save();

            //Create menu and map to store
            const menu = new Menu({store:store.id});
            store.menu=menu
            await menu.save();

            //Create reveneue and map to store
            const revenue = new Revenue({totalIncome:0,store:store.id});
            store.revenue=revenue;
            await revenue.save();

            //Create timings and map to store
            const timings = new Timing({ openTime,closeTime,status:statusTime});
            store.timings=timings;
            await timings.save();

            //Create feedback and map to store
            const feedback=new Feedback({orderServiceRating:0,deliveryServiceRating:0,comments:[]});
            store.feedback=feedback
            await feedback.save()
           
            await store.save();
            return "User Created"
            

        },
        //Delete User
        deleteUser: async (_, {id}) => {
            await User.findByIdAndRemove(id);
            return "User deleted";
        },
        //Update users OTP
        updateOtp: async (_, {email, otp}) => {
            const filter = { email: email }
            const update = { otp: otp };
            const user = await User.findOneAndUpdate(filter,update, {new: true, useFindAndModify: false});
            return user;
        },

    }
}