import { Schema, model, models } from "mongoose";

const skillSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

const Skill = model("Skill", skillSchema);

export default models.Skill || Skill;
