import mongoose from "mongoose";

const testSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fields: {
        type: [mongoose.Types.ObjectId],
        ref: "testFeild",
        required: true
    },

}, { timestamps: true })




export default mongoose.models.test || mongoose.model("test", testSchema)