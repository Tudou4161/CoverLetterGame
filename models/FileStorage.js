const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    author: {
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
    versionInfo: {
        type: [Schema.Types.ObjectId],
        required: false,
        ref: "VersionInfo"
    },
    createAt: {
        type: Date, 
        required: Date.now
    }
})

module.exports = mongoose.model("FileStorage", FileSchema)