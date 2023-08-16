import {UserSchema} from './User.model.js'
import bcrypt from "bcrypt";

// Encrypt password using bcr

UserSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

