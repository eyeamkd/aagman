const UserResolvers = require("./resolvers/UserResolver");
const StoreResolvers = require("./resolvers/StoreResolver");
const TimingResolvers = require("./resolvers/TimingResolver");
const LocationResolvers = require("./resolvers/LocationResolver");
const RevenueResolvers = require("./resolvers/RevenueResolver");
const MenuResolvers = require("./resolvers/MenuResolver");
const CategoryResolvers = require("./resolvers/CategoryResolver");
const ItemResolvers = require("./resolvers/ItemResolver");
const OrderResolvers = require("./resolvers/OrderResolver");
const BillResolvers = require("./resolvers/BillResolver");
const DeviceResolvers = require("./resolvers/DeviceResolver");
const NotificationResolvers = require("./resolvers/NotificationResolver");



const UserTypeDef = require("./typedefs/UserTypeDef");
const StoreTypeDef = require("./typedefs/StoreTypeDef");
const TimingTypeDef = require("./typedefs/TimingTypeDef");
const LocationTypeDef = require("./typedefs/LocationTypeDef");
const RevenueTypeDef = require("./typedefs/RevenueTypeDef");
const MenuTypeDef = require("./typedefs/MenuTypeDef");
const CategoryTypeDef = require("./typedefs/CategoryTypeDef");
const ItemTypeDef = require("./typedefs/ItemTypeDef");
const OrderTypeDef = require("./typedefs/OrderTypeDef");
const BillTypeDef = require("./typedefs/BillTypeDef");
const DeviceTypeDef = require("./typedefs/DeviceTypeDef");
const NotificationTypeDef = require("./typedefs/NotificationTypeDef");

const GMR = require('graphql-merge-resolvers');

const TypeDef= [ LocationTypeDef,
                 UserTypeDef,
                 StoreTypeDef,
                 TimingTypeDef,
                 LocationTypeDef,
                 RevenueTypeDef,
                 MenuTypeDef,
                 CategoryTypeDef,
                 ItemTypeDef,
                 OrderTypeDef,
                 BillTypeDef,
                 DeviceTypeDef,
                 NotificationTypeDef,
                ]



const Resolver= GMR.merge([LocationResolvers,
                           UserResolvers,
                           StoreResolvers,
                           TimingResolvers,
                           RevenueResolvers,
                           MenuResolvers,
                           CategoryResolvers,
                           ItemResolvers,
                           OrderResolvers,
                           BillResolvers,
                           DeviceResolvers,
                           NotificationResolvers,
                        ])
exports.resolver=Resolver
exports.typedef=TypeDef