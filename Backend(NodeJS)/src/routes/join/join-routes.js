import Express from "express";
const router = Express.Router();
import * as AuthController from "../../controllers/user-controller.js";

router.post("/sign-up", AuthController.signUp);
router.post("/sign-in", AuthController.signIn);

export default router;
