import {verifyAdmin} from "../middleware/admin.middleware.js";
import {verifyUser} from "../middleware/user.middleware.js";
import {
    userCreateOrder,
    userGetAllItems, userGetItemByCategoryAndPrice,
    userGetItemById,
    userGetItemsByCategory,
} from "../controllers/user.controller.js";
import {
    adminAddItem,
    adminDeleteCategory,
    adminDeleteItem, adminGetAllOrders,
    adminUpdateCategory,
    adminUpdateItem
} from "../controllers/admin.controller.js";
import {verifyPublic} from "../middleware/public.middleware.js";
import {signIn, signOut, signUp} from "../controllers/auth.controller.js";
import {adminEndpoints} from "./endpoints.config/admin.endpoints.js";
import {userEndpoints} from "./endpoints.config/user.endpoints.js";
import {authEndpoints} from "./endpoints.config/auth.endpoints.js";


export const routes = [
    {
        name: 'admin',
        api: 'admin',
        middleware: verifyAdmin,
        endpoints: adminEndpoints
    },
    {
        name: 'user',
        api: 'user',
        middleware: verifyUser,
        endpoints: userEndpoints
    },
    {
        name: 'auth',
        api: 'auth',
        middleware: verifyPublic,
        endpoints: authEndpoints
    }

]