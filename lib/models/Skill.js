import { Schema, model, models } from "mongoose";

const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default models.Skill || model("Skill", skillSchema);
