import asyncHandler from "express-async-handler";
import Patient from "../model/Patient.js";
import imageUpload from "../utils/upload.js";
import Test from "../model/Test.js";
import Doctor from "../model/Doctor.js";

export const getAllPatients = asyncHandler(async (req, res) => {
  console.log("hello");
  const result = await Patient.find({ empId: req.userId }, { __v: 0, updatedAt: 0 }).sort({ createdAt: "descending" }).populate("test", { name: 1 })

  console.log(result)
  res.status(200).json({
    message: "Patient Fetch Successs",
    result,
  });
});

export const addPatient = asyncHandler(async (req, res) => {
  imageUpload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: err.message || "Image Upload ERROR" });
    }
    if (req.files && req.files.length > 0) {
      console.log("inside file ", req.body);

      let x = [];
      for (const item of req.files) {
        x.push(item.filename);
      }
      await Patient.create({ ...req.body, report: x, empId: req.userId });
      res.status(200).json({ message: "Image Upload successful" });
    } else {
      console.log(req.body);
      await Patient.create({ ...req.body, empId: req.userId });
      res.status(200).json({ message: "register successful" });
    }
  });
  // res.status(200).json({ message: "Image Upload successful" })
});

export const updatePatient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Patient.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    message: "Patient Update Successs",
  });
});

export const deletePatient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Patient.findByIdAndDelete(id);
  res.status(200).json({
    message: "Patient Delete Successs",
  });
});

export const getAllTest = async (req, res) => {
  try {
    const result = await Test.find(
      {},
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }
    ).populate("fields", {
      fieldName: 1,
      _id: 0,
      fieldType: 1,
      isChecked: 1,
    });

    res.status(200).json({
      message: "Test Fetch Successs",
      result,
    });
  } catch (error) {
    res.status(200).json({
      error: error.message || "Test fetch Error",
    });
  }
};

export const getAllDoctor = async (req, res) => {
  try {
    const result = await Doctor.find();

    res.status(200).json({
      message: "Doctor Fetch Successs",
      result,
    });
  } catch (error) {
    res.status(200).json({
      error: error.message || "Doctor fetch Error",
    });
  }
};
