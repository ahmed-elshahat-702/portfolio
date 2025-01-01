import { Schema, models, model } from "mongoose";

const userInfoSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  job: { type: String, required: true },
  email: { type: String, required: true },
  profile: { type: String, required: true },
  phone_number: { type: String, required: true },
  facebook_link: { type: String, required: true },
  github_link: { type: String, required: true },
  youtube_link: { type: String, required: true },
  info: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export default models.User || model("User", userInfoSchema);
