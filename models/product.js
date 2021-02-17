



const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var product = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productID: String,
    productDetails: String,
    rating: Number,
    comment: Array,

},
    {
        collection: 'product'
    }
)

module.exports = mongoose.model('product', product);