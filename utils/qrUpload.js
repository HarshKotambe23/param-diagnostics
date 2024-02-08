import multer from "multer"
import path from "path"
import { v4 as uuid } from "uuid"

// const uuid = v4

const qrStorage = multer.diskStorage({
    filename: (req, file, next) => {
        const ext = path.extname(file.originalname)
        const fn = uuid() + ext
        next(null, fn)
    },
    destination: (req, file, next) => {
        next(null, 'qrUpload')
    }
})
const qrUpload = multer({ storage: qrStorage }).single("qr")

export default qrUpload 
