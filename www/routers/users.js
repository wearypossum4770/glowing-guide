import { User } from "../models/user.model.js";
import { Router } from "express";

const userRouter = Router();

userRouter.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`ERROR:${err}`));
});
userRouter.route("/add").post((req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });
  newUser
    .save()
    .then(() => res.json(`${newUser.name} Added`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
export default userRouter;
