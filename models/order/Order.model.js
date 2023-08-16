import mongoose from "mongoose";
const {Schema} = mongoose;

const OrderSchema = new Schema({

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        date: {
            type: Date,
            required: true,
        },
        items: [{
            type: Schema.Types.ObjectId,
            ref: "Order"
        }],


    }, { timestamps: true }
);


const Order = mongoose.model("Order", OrderSchema);

export default Order;

