import mongoose from "mongoose";

const fieldSchama = mongoose.Schema({
    fieldName: {
        type: String,
        required: true
    },
    fieldType: {
        type: String,
        required: true
    },
    isChecked: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })
export default mongoose.models.testFeild || mongoose.model("testFeild", fieldSchama)