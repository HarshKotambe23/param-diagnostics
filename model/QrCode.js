import mongoose from 'mongoose';

const qrCodeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qr: {
        type: String,
        required: true
    }
})
export default mongoose.models.qr || mongoose.model("qr", qrCodeSchema)