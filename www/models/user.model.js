import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    alive: { type: Boolean, default: false, adminSearchField: true },
    date_joined: { type: Date, default: new Date(), adminSearchField: true },
    date_of_birth: { type: Date, adminSearchField: true },
    date_of_death: { type: Date, adminSearchField: true },
    do_not_contact: { type: Boolean, default: false, adminSearchField: true },
    honorific_prefix: { type: String, default: "", adminSearchField: true },
    honorific_suffix: { type: String, default: "", adminSearchField: true },
    is_active: { type: Boolean, default: true, adminSearchField: true },
    is_staff: { type: Boolean, default: false, adminSearchField: true },
    is_superuser: { type: Boolean, default: false, adminSearchField: true },
    last_login: { type: Date, default: new Date(), adminSearchField: true },
    firstName: { type: String, default: "", adminSearchField: true },
    middleName: { type: String, default: "", adminSearchField: true },
    lastName: { type: String, default: "", adminSearchField: true },
    madienName: { type: String, default: "", adminSearchField: true },
    nickname: { type: String, default: "", adminSearchField: true },
    owasp_safe_password: {},
    password: {},
    prompt_password_change: {},
    retention_only: { type: Boolean, default: false, adminSearchField: true },
    suffix: { type: String, default: "", adminSearchField: true },
    title: { type: String, default: "", adminSearchField: true },
    onboarding: {
      signupDate: { type: Date, admin: false },
      hasLoggedIn: { type: Boolean, default: false },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      admin: false,
      required: true,
      index: { unique: true, sparse: true },
    },
    alive: Boolean,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
