import Category from "../models/category/Category.model.js";
import Item from "../models/item/Item.model.js";
import Order from "../models/order/Order.model.js";


// @desc add item
// @method POST
// @params none
// @body name, price, category, quantity, imageurl
// @return the item created
export const adminAddItem = async (req,res) =>{

   try{

      const {name, price, category, quantity, imageUrl} = req.body

       let existCategory = await Category.findOne({name: category})

       if(!existCategory){
        existCategory = await Category.create({name: category})
       }

       const item = await Item.create({
           name,
           price,
           quantity,
           imageUrl,
           category: existCategory

       })

       return res.status(200).json({message: "success", item: item})

   }catch(error){
       return res.status(500).json({error: error})
   }
}

// @desc delete item
// @method DELETE
// @params item id
// @body none
// @return none
export const adminDeleteItem = async (req,res) =>{

    try{

        const {itemId} = req.params

        await Item.findByIdAndDelete(itemId)

        res.status(200).json({message: "Deleted Successfully"})


    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

// @desc update item
// @method PATCH
// @params item id
// @body name, price, category, quantity, imageUrl
// @return none
export const adminUpdateItem = async (req,res) =>{

    try{

        const {itemId} = req.params
        const {name, price, category, quantity, imageUrl} = req.body

        let existCategory = await Category.findOne({name: category})

        if(!existCategory){
            existCategory = await Category.create({name: category})
        }

        await Item.findByIdAndUpdate(itemId, {
            name,
            price,
            category: existCategory,
            quantity,
            imageUrl,
        })

        res.status(200).json({message: "Updated Successfully"})


    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

// @desc update category name
// @method PATCH
// @params category name
// @body name
// @return none
export const adminUpdateCategory = async (req,res) =>{

    try{

        const {categoryName} = req.params
        const {name} = req.body

        let existCategory = await Category.findOne({name: categoryName})

        if(!existCategory){
            return res.status(200).json({message: "Category not exist"})
        }

        await Category.findByIdAndUpdate(existCategory, {name})

        return res.status(200).json({message: "Updated Successfully"})


    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

// @desc delete category
// @method DELETE
// @params category name
// @body none
// @return none
export const adminDeleteCategory = async (req,res) =>{

    try{




        res.status(200).json({message: "Category deleted Successfully"})


    }catch(error){
        return res.status(500).json({error: error.message})
    }
}

// @desc get all orders
// @method GET
// @params none
// @body none
// @return array of all orders
export const adminGetAllOrders = async (req,res) =>{

    try{

        const orders = await Order.find().populate('items');

        const orderDetails = orders.map(order => ({
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



        return res.status(200).json(orderDetails)



    }catch(error){
        return res.status(500).json({error: error.message})
    }
}