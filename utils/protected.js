import jwt from "jsonwebtoken"
import Employee from "../model/Employee.js"

export const employeeProtectedRoute = (req, res, next) => {
    try {
        const { auth } = req.cookies
        if (!auth) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        jwt.verify(auth, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized" })
            }
            req.userId = decoded.userId
            const result = await Employee.findById(decoded.userId)
            if (!result) {
                return res.status(401).json({ error: "Invalid Id" })
            }
            if (!result.active) {
                return res.status(401).json({ error: "Account Blocked By Admin" })
            }
            next()
        })
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" })
    }
}
export const adminProtectedRoute = async (req, res, next) => {
    try {
        const { auth } = req.cookies
        if (!auth) {
            return res.status(401).json({ error: "No Cookie" })
        }
        jwt.verify(auth, process.env.JWT_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "JWT ERROR" })
            }
            const result = await Employee.findById(decoded.userId)
            if (result.role !== "admin") {
                return res.status(401).json({ error: "admin only route" })
            }

            req.userId = decoded.userId
            next()
        })
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized" })
    }
}