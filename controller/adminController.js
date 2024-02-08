import Employee from "../model/Employee.js"
import Patient from "../model/Patient.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Test from "../model/Test.js"
import Doctor from "../model/Doctor.js"
import TestFields from "../model/TestFields.js"
import asyncHandler from "express-async-handler"
import sendEmail from "../utils/email.js"
import QrCode from "../model/QrCode.js"
import qrUpload from "../utils/qrUpload.js"


export const adminGetAllPatients = async (req, res) => {
    try {
        const result = await Patient.find({}, { __v: 0, updatedAt: 0 }).populate('test', { name: 1 }).sort({ "createdAt": "descending" }).populate("empId", { name: 1 })
        console.log(result);
        res.status(200).json({
            message: "User asdasdasd Successs",
            result
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "User Fetch Error",
        })
    }
}
export const adminGetAllPatientFeilds = async (req, res) => {
    try {
        const result = await Patient.schema.paths
        res.status(200).json({
            message: "Patient Fields",
            result: Object.keys(result).filter(item => item !== "updatedAt" && item !== "__v" && item !== "_id")
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "User Fetch Error",
        })
    }
}


export const adminGetAllEmployees = async (req, res) => {
    try {
        const result = await Employee.find({ role: "emp" }, { _id: 1, name: 1, email: 1, active: 1 })
        res.status(200).json({
            message: "User Fetch Successs",
            result
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "User Fetch Error",
        })
    }
}

export const adminRegisterEmployee = async (req, res) => {
    try {
        const { email, password, name } = req.body
        const result = await Employee.findOne({ email })
        if (result) {
            return res.status(409).json({ error: "Email already registered" })
        }
        const hash = await bcrypt.hash(password, 10)
        await sendEmail({
            to: email,
            subject: "Welcome to Param Diagnostic System",
            message: `
                <h1>Hi, Welcome, <i>${name}</i> </h1>
                <p>your credentials for this account is</p>
                <p>email    : <i>${email}</i></p>
                <p>passcode : <i>${password}</i></p>
            `
        })

        await Employee.create({ ...req.body, password: hash, role: 'emp' })
        res.status(200).json({ message: "Employee Register Success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message || "Employee Register Error" })
    }
}
export const adminDeleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        await Employee.findByIdAndDelete(id)

        res.status(200).json({
            message: "Employee Delete Successs"
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "Employee Delete Error",
        })
    }
}
export const adminToggleEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const { active } = req.body
        await Employee.findByIdAndUpdate(id, { active })

        res.status(200).json({
            message: "Employee Toggle Successs"
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "Employee Delete Error",
        })
    }
}
export const adminUpdateEmployeePassword = async (req, res) => {
    try {
        const { id } = req.params
        const { password } = req.body
        const hashPass = await bcrypt.hash(password, 10)
        const result = await Employee.findByIdAndUpdate(id, { password: hashPass })
        await sendEmail({
            to: result.email,
            subject: "🔐 Credentials Update ",
            message: `
                <h1>Hi, <i>${result.name}</i> </h1>
                <p>your credentials for this account is Updated </p>
                <p>email    : <i>${result.email}</i></p>
                <p>passcode : <i>${password}</i></p>
            `
        })

        res.status(200).json({
            message: "Employee Password Update Successs"
        })
    } catch (error) {
        res.status(400).json({
            error: error.message || "Employee Delete Error",
        })
    }
}



export const adminUpdatePatient = async (req, res) => {
    try {
        await Patient.findByIdAndUpdate(req.body._id, req.body)

        res.status(200).json({
            message: "Patient Update Successs"
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "Patient Update Error",
        })
    }
}


export const adminAddTest = async (req, res) => {
    try {
        await Test.create(req.body)

        res.status(201).json({
            message: "Test Add Successs"
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "Test Update Error",
        })
    }
}
export const adminDeleteTest = async (req, res) => {
    try {
        const { testId } = req.params
        await Test.findByIdAndDelete(testId)

        res.status(200).json({
            message: "Test Delete Successs"
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "Test Delete Error",
        })
    }
}
export const adminGetAllTest = async (req, res) => {
    try {
        const result = await Test.find({}, {
            createdAt: 0,
            updatedAt: 0,
            __v: 0
        }).populate("fields", {
            fieldName: 1,
            _id: 0,
            fieldType: 1,
            isChecked: 1
        })

        res.status(200).json({
            message: "Test Fetch Successs",
            result
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "Test fetch Error",
        })
    }
}



export const adminAddDoctor = async (req, res) => {
    try {
        await Doctor.create(req.body)

        res.status(201).json({
            message: "Doctor Add Successs"
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "Doctor Update Error",
        })
    }
}
export const adminDeleteDoctor = async (req, res) => {
    try {
        const { doctorId } = req.params
        await Doctor.findByIdAndDelete(doctorId)

        res.status(200).json({
            message: "Doctor Delete Successs"
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "Doctor Delete Error",
        })
    }
}
export const adminGetAllDoctor = async (req, res) => {
    try {
        const result = await Doctor.find()

        res.status(200).json({
            message: "Doctor Fetch Successs",
            result
        })
    } catch (error) {
        res.status(200).json({
            error: error.message || "Doctor fetch Error",
        })
    }
}




export const getAllTestFieldAdmin = asyncHandler(async (req, res) => {
    console.log(req.userId);
    const result = await TestFields.find()
    res.status(200).json({
        message: "TestFields Fetch Successs",
        result
    })
})

export const addTestFieldAdmin = asyncHandler(async (req, res) => {
    await TestFields.create(req.body)
    res.status(200).json({ message: "TestFields Create successful" })


})

export const updateTestFieldAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params
    await TestFields.findByIdAndUpdate(id, req.body)
    res.status(200).json({
        message: "TestFields Update Successs"
    })
})

export const deleteTestFieldAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params
    await TestFields.findByIdAndDelete(id)
    res.status(200).json({
        message: "TestFields Delete Successs",
    })
})

export const deleteQrCode = asyncHandler(async (req, res) => {
    qrUpload(req, res, async (err) => {
        const { id } = req.params
        await QrCode.findByIdAndDelete(id)
        res.status(200).json({ message: "Image Delete successful" })

    });
});
export const addQrCode = asyncHandler(async (req, res) => {
    qrUpload(req, res, async (err) => {
        if (err) {
            return res
                .status(500)
                .json({ error: err.message || "Image Upload ERROR" });
        }
        await QrCode.create({ name: req.body.name, image: req.file.filename })
        res.status(200).json({ message: "Image Upload successful" })

    });
});