const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VersionSchema = new Schema({
    author: {
        required: true,
        type: String
    },
    versionName: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    content: {
        required: false,
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("VersionInfo", VersionSchema)