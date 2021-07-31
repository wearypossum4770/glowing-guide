import mongoose from "mongoose";
import cuid from "cuid";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const addressSchema = new Schema({
  idempotent_key: {
    type: String,
    admin: false,
    default: cuid(),
    required: true,
  },
  address_type: { type: String, admin: false, required: true },
  street1: { type: String, admin: false, required: true },
  street2: { type: String, admin: false, required: false },
  state: { type: String, admin: false, required: true },
  city: { type: String, admin: false, required: true },
  zipcode: { type: String, admin: false, required: true },
});

export const Address = mongoose.model("Post", addressSchema);
