import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const blogPostSchema = new Schema({
  author: ObjectId,
  title: String,
  content: String,
  slug: { type: String, unique: true },
  comments: [{ body: String, date: Date }],
  date_posted: { type: Date, default: Date.now },
});

export const BlogPost = mongoose.model("Post", blogPostSchema);
