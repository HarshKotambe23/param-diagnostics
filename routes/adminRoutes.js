
import { Router } from "express"
import {
    addQrCode,
    addTestFieldAdmin,
    adminAddDoctor,
    adminAddTest,
    adminDeleteDoctor,
    adminDeleteEmployee,
    adminDeletePatient,
    adminDeleteTest,
    adminGetAllDoctor,
    adminGetAllEmployees,
    adminGetAllPatientFeilds,
    adminGetAllPatients,
    adminGetAllTest,
    adminRegisterEmployee,
    adminToggleEmployee,
    adminUpdateEmployeePassword,
    adminUpdatePatient,
    deleteQrCode,
    deleteTestFieldAdmin,
    getAllQrCodesAdmin,
    getAllTestFieldAdmin,
    updateTestFieldAdmin
} from "../controller/adminController.js"
const router = Router()
router
    .get("/patients", adminGetAllPatients)
    .get("/patients-fields", adminGetAllPatientFeilds)
    .get("/employees", adminGetAllEmployees)
    .post("/employee-register", adminRegisterEmployee)
    .delete("/employee/remove/:id", adminDeleteEmployee)

    .put("/employee/toggle/:id", adminToggleEmployee)
    .put("/employee/password-update/:id", adminUpdateEmployeePassword)
    // adminUpdateEmployeePassword)


    .put("/patient/update", adminUpdatePatient)
    .delete("/patient/delete/:id", adminDeletePatient)

    .get("/test", adminGetAllTest)
    .post("/test/add", adminAddTest)
    .delete("/test/remove/:testId", adminDeleteTest)

    .get("/doctor", adminGetAllDoctor)
    .post("/doctor/add", adminAddDoctor)
    .delete("/doctor/remove/:doctorId", adminDeleteDoctor)


    .get("/testField", getAllTestFieldAdmin)
    .post("/testField/add", addTestFieldAdmin)
    .put("/testField/update/:id", updateTestFieldAdmin)
    .delete("/testField/remove/:id", deleteTestFieldAdmin)


    .get("/qr", getAllQrCodesAdmin)
    .post("/qr-add", addQrCode)
    .delete("/qr-delete/:id", deleteQrCode)

export default router