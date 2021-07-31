import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const profileSchema = new Schema({
  title: { type: String, admin: false, required: true },
  slug: { type: String, unique: true, admin: false },
  user: { type: String, admin: false, required: true },
  image: { type: String, admin: false, required: true },
  date_created: { type: String, admin: false, required: true },
  date_modified: { type: String, admin: false, required: true },
  is_public: { type: String, admin: false, required: true },
  is_active: { type: String, admin: false, required: true },
  mobile_number: { type: String, admin: false, required: true },
  internal_notes: [],
  addresses: [],
});

export const Profile = mongoose.model("Post", profileSchema);
