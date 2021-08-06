import { Router } from "express";
import {
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addresses.js";
const addressRouter = Router();
/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */
addressRouter.get("/", getAllAddresses);
/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */
addressRouter.post("/", createAddress);
/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
addressRouter.put("/:id", updateAddress);
/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
addressRouter.delete("/:id", deleteAddress);
export default addressRouter;
