import mongoose from "mongoose";
const {Schema} = mongoose;

export const ItemSchema = new Schema({

        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 25
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
            max: 999
        },
        price: {
            type: Number,
            required: true,
            min: 0,
            max: 999
        },
        imageUrl: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 256
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        },


    }, { timestamps: true }
);


const Item = mongoose.model("Item", ItemSchema);

export default Item;

