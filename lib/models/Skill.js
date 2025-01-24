import { Schema, model, models } from "mongoose";

const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default models.Skill || model("Skill", skillSchema);
