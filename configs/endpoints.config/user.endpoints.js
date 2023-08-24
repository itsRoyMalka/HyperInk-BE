import {
    userCreateOrder
   , userGetOrders
} from "../../controllers/user.controller.js";

export const userEndpoints = [

    {
        name: 'create order',
        method: 'post',
        endpoint: 'create-order',
        controller: userCreateOrder
    },
    {
        name: 'get orders',
        method: 'get',
        endpoint: 'get-orders',
        controller: userGetOrders
    }
]