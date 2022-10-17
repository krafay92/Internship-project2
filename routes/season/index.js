import express from "express";
import authValidation from "../../validations/season.validation.js";
import validate from "../../middlewares/validate.js";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.get("/", controllers.getAll);
router.get("/series/:id", controllers.getBySeries);
router.post("/",validate(authValidation.add), controllers.add);
router.get("/:id", controllers.getById);
router.patch("/:id",validate(authValidation.update), controllers.update);
router.delete("/:id", controllers.delete);

export default router;
