"use strict";
import { Router } from "express";
import { User } from "../models/user.model.js";
const userRouter = Router();
userRouter.route("/bulk-create").post(async (req, res) => {
  try {
    let userList = req.body;
    let arr = userList?.map((user) => ({
      ...user,
      madienName: user.madien_name,
      firstName: user.first_name,
      lastName: user.last_name,
      middleName: user.middle_name,
    }));
    await User.create(arr);
    await User.init();
    res.json("Bulk Users Created");
  } catch (err) {
    res.status(400).json(`ERROR:${err.message}`);
  }
});
userRouter.route("/").get(async (req, res) => {
  try {
    let userList = await User.find({});
    if (userList) {
      res.json(userList);
    }
  } catch (err) {
    res.status(400).json(`ERROR:${err}`);
  }
});
userRouter.route("/add").post(async (req, res) => {
  try {
    let {
      password,
      username,
      email,
      nickname,
      first_name: { firstName },
      last_name: { lastName },
      middle_name: { middleName },
      title,
      honorific_prefix,
      honorific_suffix,
      suffix,
      date_of_birth,
      date_of_death,
      do_not_contact,
    } = req.body;
    const newUser = new User({
      password,
      username,
      email,
      nickname,
      firstName,
      lastName,
      middleName,
      title,
      honorific_prefix,
      honorific_suffix,
      suffix,
      date_of_birth,
      date_of_death,
      do_not_contact,
      prompt_password_change,
    });
    await newUser.save({ timestamps: true });
    res.json(`User Added`);
  } catch (err) {
    res.status(400).json(`Error: ${err.message}`);
  }
});
userRouter.route("/:id").get(async (req, res) => {
  try {
    let { id } = req.params;
    res.json(await User.findById(id));
  } catch (err) {
    res.status(400).json(`Error: ${err.message}`);
  }
});
userRouter.route("update/:id").post(async (req, res) => {
  try {
    let {
      password,
      username,
      email,
      nickname,
      first_name: { firstName },
      last_name: { lastName },
      middle_name: { middleName },
      title,
      honorific_prefix,
      honorific_suffix,
      suffix,
      date_of_birth,
      date_of_death,
      do_not_contact,
    } = req.body;
    let { id } = req.params;
    let user = await User.findById(id);
    user.password = password;
    user.username = username;
    user.email = email;
    user.nickname = nickname;
    user.firstName = firstName;
    user.lastName = lastName;
    user.middleName = middleName;
    user.title = title;
    user.honorific_prefix = honorific_prefix;
    user.honorific_suffix = honorific_suffix;
    user.suffix = suffix;
    user.date_of_birth = Date.parse(date_of_birth);
    user.date_of_death = Date.parse(date_of_death);
    user.do_not_contact = do_not_contact;
    user.prompt_password_change = prompt_password_change;
    res.json(`User information updated for: ${user.username}`);
  } catch (err) {
    res.status(400).json(`Error: ${err.message}`);
  }
});
export default userRouter;
