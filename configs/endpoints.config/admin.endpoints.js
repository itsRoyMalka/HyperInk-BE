import {
    adminAddItem, adminDeleteCategory,
    adminDeleteItem, adminGetAllOrders,
    adminUpdateCategory,
    adminUpdateItem
} from "../../controllers/admin.controller.js";

export const adminEndpoints = [
    {
        name: 'admin add item',
        method: 'post',
        endpoint: 'add-item',
        controller: adminAddItem
    },
    {
        name: 'admin delete item',
        method: 'delete',
        endpoint: 'delete-item/:itemId',
        controller: adminDeleteItem
    },
    {
        name: 'admin update item',
        method: 'patch',
        endpoint: 'update-item/:itemId',
        controller: adminUpdateItem
    },
    {
        name: 'update category ',
        method: 'patch',
        endpoint: 'update-category/:categoryName',
        controller: adminUpdateCategory
    },
    {
        name: 'update category name',
        method: 'delete',
        endpoint: 'delete-category/:categoryName',
        controller: adminDeleteCategory
    },
    {
        name: 'get all orders',
        method: 'get',
        endpoint: 'get-all-orders',
        controller: adminGetAllOrders
    },

]