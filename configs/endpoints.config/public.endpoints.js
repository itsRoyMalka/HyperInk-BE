
import {
    publicGetAllItems,
    publicGetItemByCategoryAndPrice,
    publicGetItemById,
    publicGetItemsByCategory
} from "../../controllers/public.controller.js";


export const publicEndpoints = [
    {
        name: 'get all items',
        method: 'get',
        endpoint: 'get-all-items',
        controller: publicGetAllItems
    },
    {
        name: 'get item by id',
        method: 'get',
        endpoint: 'get-item-by-id/:itemId',
        controller: publicGetItemById
    },
    {
        name: 'get items by category',
        method: 'get',
        endpoint: 'get-items-by-category/:categoryName',
        controller: publicGetItemsByCategory
    },
    {
        name: 'get items by category and price',
        method: 'post',
        endpoint: 'get-items-by-category-and-price',
        controller: publicGetItemByCategoryAndPrice
    },
]