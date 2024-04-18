import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Employee from "../model/Employee.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);
    const result = await Employee.findOne({ email });
    if (!result) {
      return res.status(401).json({ error: "Email not found" });
    }
    if (!result.active) {
      return res.status(401).json({ error: "Account Blocked By Admin" });
    }
    const verify = await bcrypt.compare(password, result.password);
    if (!verify) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, {
      expiresIn: "180d",
    });
    res.cookie("auth", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 180 });
    res.status(200).json({
      message: "User Login Success",
      result: {
        _id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "User Login Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("auth");
    res.status(200).json({
      message: "User Logout Success",
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "User Logout Error" });
  }
};
