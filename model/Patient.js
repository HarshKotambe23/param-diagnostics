import mongoose from "mongoose";

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      // required: true
    },
    age: {
      type: Number,
      // required: true
    },
    weight: {
      type: Number,
      // required: true
    },
    lmp: {
      type: String,
      // required: true
    },
    dob: {
      type: String,
      // required: true
    },
    mobile: {
      type: String,
      // required: true
    },
    doctor: {
      type: String,
      // required: true
    },
    test: {
      type: [mongoose.Types.ObjectId],
      ref: "test",
      // required: true
    },
    paid: {
      type: Number,
      // required: true
    },
    balance: {
      type: Number,
      // required: true
    },
    report: {
      type: [String],
      // required: true
    },
    empId: {
      type: mongoose.Types.ObjectId,
      ref: "employee",
      required: true,
    },
    reportDelivered: {
      type: Boolean,
      default: false,
    },
    phleboSetteled: {
      type: Boolean,
      default: false,
    },
    doctorSetteled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.patient ||
  mongoose.model("patient", patientSchema);
