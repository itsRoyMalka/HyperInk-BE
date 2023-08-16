import mongoose from "mongoose";
const {Schema} = mongoose;

const CategorySchema = new Schema({

        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 25
        },

    }, { timestamps: true }
);


const Category = mongoose.model("Category", CategorySchema);

export default Category;

