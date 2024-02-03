import mongoose from "mongoose";


const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        // required: true
    },

}, { timestamps: true })

export default mongoose.models.doctor || mongoose.model("doctor", doctorSchema)