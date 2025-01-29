import { Schema, model, models } from "mongoose";

const educationSchema = new Schema({
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  site: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Education || model("Education", educationSchema);
