const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: String
})

const Tododb = mongoose.model('tododb', schema);

module.exports = Tododb;