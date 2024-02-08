
import { Router } from "express"
import {
    addPatient,
    deletePatient,
    getAllDoctor,
    getAllPatients,
    getAllQr,
    getAllTest,
    updatePatient
} from "../controller/employeeController.js"


const router = Router()

router
    .get("/", getAllPatients)
    .post("/register-patient", addPatient)
    .put("/update-patient/:id", updatePatient)
    .delete("/delete-patient/:id", deletePatient)
    .get("/tests", getAllTest)
    .get("/doctors", getAllDoctor)
    .get("/qr", getAllQr)

export default router