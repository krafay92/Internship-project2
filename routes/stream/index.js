import express from "express";
import authValidation from "../../validations/stream.validation.js";
import validate from "../../middlewares/validate.js";
import controllers from "./controllers.js";
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();
router.get("/", authenticate, controllers.getAll);
router.get("/history", authenticate, controllers.getStreamHistory)
router.post("/", authenticate, validate(authValidation.add), controllers.add);
router.get("/:id", authenticate, controllers.getById);
router.patch("/:id", authenticate, validate(authValidation.update), controllers.update);
router.delete("/:id", authenticate, controllers.delete);

export default router;
