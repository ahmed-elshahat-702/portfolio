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
  info: {
    type: String,
    required: true,
  },
});

const Education = model("Education", educationSchema);

export default models.Education || Education;
