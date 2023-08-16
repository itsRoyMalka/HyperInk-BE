import {
    userCreateOrder,
    userGetAllItems,
    userGetItemByCategoryAndPrice,
    userGetItemById,
    userGetItemsByCategory, userGetOrders
} from "../../controllers/user.controller.js";

export const userEndpoints = [
    {
        name: 'get all items',
        method: 'get',
        endpoint: 'get-all-items',
        controller: userGetAllItems
    },
    {
        name: 'get item by id',
        method: 'get',
        endpoint: 'get-item-by-id/:itemId',
        controller: userGetItemById
    },
    {
        name: 'get items by category',
        method: 'get',
        endpoint: 'get-items-by-category/:categoryName',
        controller: userGetItemsByCategory
    },
    {
        name: 'get items by category and price',
        method: 'post',
        endpoint: 'get-items-by-category-and-price',
        controller: userGetItemByCategoryAndPrice
    },
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