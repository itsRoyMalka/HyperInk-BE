import Item from "../models/item/Item.model.js";
import Category from "../models/category/Category.model.js";
import Order from "../models/order/Order.model.js";




// @desc get items by category and price
// @method POST
// @params none
// @body { items: [ {"id": id, quantity: 3}, {...another}]}
// @return none
export const userCreateOrder = async (req,res) =>{

    //looks like shit, but works. do not touch
    try{

        //items is array of id's and quantity example: { items: [ {"id": id, quantity: 3}, {...rest}]}
        const {items} = req.body

        const user = req.user

        const itemIds = await items.map(item=>item.id)

        //validate
        const itemsFound = await Item.find({ _id: { $in: itemIds } });

        if(itemsFound.length !== items.length){
            return res.status(400).json({message: "Not a valid order, 1 or more items not exists"})
        }

        let isValid = true

        //quantity validation
        await itemsFound.map(item=>{
            items.map(it=>{
                if(it.quantity < 1 || item.quantity < it.quantity){
                    isValid = false

                }else{
                    item.quantity -= it.quantity
                }
            })
        })

        if(!isValid){
            return res.status(400).json({message: "Not a valid order, not enough quantity"})
        }

      await Promise.all(
          itemsFound.map(item=> item.save())
      )

        const order = await Order.create({
            user,
            date: Date.now(),
            items: items.map(item=>{
                return item.id
            })
        })

        user.orders.push(order)
        user.save()



        return res.status(200).json({message: "Order created Successfully"})

    }catch(error){
        res.status(500).json({error: error.message})
    }
}


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