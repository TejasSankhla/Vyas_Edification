import Express from "express";
const router = Express.Router();
import joinroutes from "./join/join-routes.js";
router.use("/join", joinroutes);
export default router;
