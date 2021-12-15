const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    count: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

const Items = mongoose.model("Items", ItemSchema);

module.exports = Items;