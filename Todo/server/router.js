import { Router } from "express";
import * as controler from "../server/controler.js";
const router=Router();
router.route("/add").post(controler.add)
router.route("/get").get(controler.get)
router.route("/delete/:id").delete(controler.deleteTodo)
router.route("/edit/:id").put(controler.updateTodo)


 export default router;