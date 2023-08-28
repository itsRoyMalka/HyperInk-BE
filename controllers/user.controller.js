import Item from "../models/item/Item.model.js";
import Category from "../models/category/Category.model.js";
import Order from "../models/order/Order.model.js";




// @desc get items by category and price
// @method POST
// @params none
// @body { items: [ {"id": id, quantity: 3}, {...another}]}
// @return none
export const userCreateOrder = async (req, res) => {
    try {
        const cartData = req.body;
        const user = req.user;

        // Extract itemIds from cartData
        const itemIds = cartData.map(item => item.itemId);

        // Validate if all items in cartData exist
        const itemsFound = await Item.find({ _id: { $in: itemIds } });

        if (itemsFound.length !== cartData.length) {
            return res.status(400).json({ message: "Not a valid order, one or more items do not exist" });
        }

        let isValid = true;

        // Quantity validation
        for (const item of cartData) {
            const matchingItem = itemsFound.find(foundItem => foundItem._id.equals(item.itemId));

            if (!matchingItem || matchingItem?.quantity < item?.quantity) {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            return res.status(400).json({ message: "Not a valid order, not enough quantity for one or more items" });
        }

        // Deduct item quantities and save
        for (const item of cartData) {
            const matchingItem = itemsFound.find(foundItem => foundItem._id.equals(item.itemId));
            matchingItem.quantity -= item.quantity;
            await matchingItem.save();
        }

        // Create the order
        const orderItems = cartData.map(item => item.itemId);
        const order = await Order.create({
            user,
            date: Date.now(),
            items: orderItems
        });

        // Update user's orders
        user.orders.push(order);
        await user.save();

        return res.status(200).json({ message: "Order created Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};



// @desc get all user orders
// @method GET
// @params none
// @body none
// @return none
export const userGetOrders = async (req,res) =>{

    try{
        const user = req.user

            await user.populate({
                path: 'orders',
                populate: {
                    path: 'items',
                    model: 'Item',
                    populate: {
                        path: 'category',
                        model: 'Category'
                    }
                }
            });

        const orderDetails = user.orders.map(order => ({
            id: order._id,
            date: order.date,
            items: order.items.map(item => ({
                id: item._id,
                name: item.name,
                price: item.price,
                imageUrl: item.imageUrl,
                category: item.category.name


            }))
        }));


        res.status(200).json(orderDetails)

    }catch(error){
        res.status(500).json({error: error.message})
    }
}