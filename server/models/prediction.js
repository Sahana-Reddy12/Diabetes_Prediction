import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    result: { type: String, required: true },

    inputs: {
      Pregnancies: Number,
      Glucose: Number,
      BloodPressure: Number,
      SkinThickness: Number,
      Insulin: Number,
      BMI: Number,
      DiabetesPedigreeFunction: Number,
      Age: Number,
    },

    overview: {
      Age: { value: Number, normalRange: String, status: String },
      BMI: { value: Number, normalRange: String, status: String },
      BloodPressure: { value: Number, normalRange: String, status: String },
      DiabetesPedigreeFunction: { value: Number, normalRange: String, status: String },
      Glucose: { value: Number, normalRange: String, status: String },
      Insulin: { value: Number, normalRange: String, status: String },
      Pregnancies: { value: Number, normalRange: String, status: String },
      SkinThickness: { value: Number, normalRange: String, status: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Prediction", predictionSchema);
