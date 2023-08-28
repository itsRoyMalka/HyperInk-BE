// @desc get all items
// @method GET
// @params none
// @body none
// @return array of items
import Item from "../models/item/Item.model.js";
import Category from "../models/category/Category.model.js";

export const publicGetAllItems = async (req, res) =>{

    try{

        const items = await Item.find().populate('category');

        res.status(200).json(items)

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

// @desc get item by id
// @method GET
// @params item id
// @body none
// @return single item
export const publicGetItemById = async (req,res) =>{

    try{

        const {itemId} = req.params


        const item = await Item.findById(itemId).populate('category');


        res.status(200).json(item === null ? {message:'no item found'} : {item})

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

// @desc get items by category name
// @method GET
// @params category name
// @body none
// @return array of items
export const publicGetItemsByCategory = async (req,res) =>{

    try{

        const {categoryName} = req.params

        let existCategory = await Category.findOne({name: categoryName})

        if(!existCategory){
            return res.status(200).json({message: "Category not exist"})
        }

        let items = await Item.find()

        items = await items.filter(item=>item.category !== existCategory)

        res.status(200).json(items)

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

// @desc get items by category and price
// @method POST
// @params none
// @body category name, minimum price, maximum price
// @return array of items
export const publicGetItemByCategoryAndPrice = async (req, res) => {
    try {
        const { params, categoryName, minPrice, maxPrice } = req.body;

        console.log(params)
        let query = {};

        if (categoryName !== 'all') {
            query.category = await Category.findOne({ name: categoryName });
        }

        if (minPrice !== undefined && maxPrice !== undefined) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        }

        if (params) {

            query.name = { $regex: new RegExp(params, 'i') };
        }

        const items = await Item.find(query).populate('category');

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


