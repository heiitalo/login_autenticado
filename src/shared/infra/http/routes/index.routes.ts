import { Router } from "express";

import{userRoute} from "../../../../modules/usuarios/routes/User.routes"

const router = Router();

router.use("/user", userRoute)

export {router}