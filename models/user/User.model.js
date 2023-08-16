import mongoose from "mongoose";
const {Schema} = mongoose;

export const UserSchema = new Schema({

        isAdmin:{
            type: Boolean,
            default: false
        },
        firstName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 25
        },
        lastName: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 25
        },
        email: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 25
        },
        password: {
        type: String,
        required: true,
        minLength: 6,
        },
        phone: {
            type: String,
            required: true,
            minLength: 9,
            maxLength: 15
        },
        address: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 15
        },
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: "Order"
            }
        ]

    }, { timestamps: true }
);


const User = mongoose.model("User", UserSchema);

export default User;

