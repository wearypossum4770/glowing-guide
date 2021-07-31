import { User } from "../models/user.model.js";
import { Router } from "express";

const userRouter = Router();

userRouter.route("/").get((req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`ERROR:${err}`));
});
userRouter.route("/add").post((req, res) => {
  console.log(req.body);
  const username = req.body?.username || "ADMIN";
  // lastName
  const newUser = new User({ username });
  console.log(newUser);
  newUser
    .save()
    .then(() => res.json(`User Added`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
export default userRouter;
