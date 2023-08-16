import {ItemSchema} from './Item.model.js'

// Encrypt password using bcr

ItemSchema.pre('save', async function (next) {

    //TODO Validation

    next()

});

