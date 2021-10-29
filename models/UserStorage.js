const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        required: true,
        type: String
    },
    pw: {
        required: true,
        type: String
    },
    emailAddress: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", UserSchema);