import express from "express";
import authValidation from "../../validations/stream.validation.js";
import validate from "../../middlewares/validate.js";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.get("/", controllers.getAll);
router.get("/history", controllers.getStreamHistory)
router.post("/",validate(authValidation.add), controllers.add);
router.get("/:id", controllers.getById);
router.patch("/:id",validate(authValidation.update), authenticate, controllers.update);
router.delete("/:id", authenticate, controllers.delete);

export default router;
