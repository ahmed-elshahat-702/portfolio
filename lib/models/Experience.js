import { Schema, model, models } from "mongoose";

const experienceSchema = new Schema({
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
});

export default models.Experience || model("Experience", experienceSchema);
