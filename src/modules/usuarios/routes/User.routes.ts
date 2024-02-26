import { Router } from "express";
import { UserController } from "../controller/UserController";
import { validateRequestBody, validateRequestParams } from "zod-express-middleware";
import {
  cadUserValidator,
  getUserByCpfValidator,
  getUserByIdValidator,
  getUserByNomeValidator,
  getuserByEmailValidator,
  updateUserValidator,
} from "../../../shared/middlewares/zodValidation/User";
import { checkToken } from "../../../shared/middlewares/token/AuthMiddlewareUser";
const upload = require("../../../shared/middlewares/multer/uploadImage")


const userRoute = Router();
const userController = new UserController();

userRoute.post("/login", userController.login);
userRoute.get("/logout", checkToken, userController.logout);
userRoute.post("/cadUsuario", validateRequestBody(cadUserValidator),userController.register);
userRoute.patch("/updateUsuario", checkToken, validateRequestBody(updateUserValidator), userController.update);
userRoute.get("/getAllUsuario", checkToken, userController.getAll);
userRoute.get("/getUsuarioByNome/:nome", checkToken, validateRequestParams(getUserByNomeValidator), userController.getByNome)
userRoute.get("/getUsuarioByEmail/:email", checkToken, validateRequestParams(getuserByEmailValidator), userController.getByEmail)
userRoute.get("/getUsuarioByCPF/:cpf", checkToken, validateRequestParams(getUserByCpfValidator), userController.getByCPF)
userRoute.get("/getUsuarioById/:id", checkToken, validateRequestParams(getUserByIdValidator), userController.getById)
userRoute.post("/envioEmailRecuperarSenha", userController.envioDeEmailtrocaDeSenha);
userRoute.patch( "/resetSenha/:resetToken", userController.resetSenha);
userRoute.patch("/cadFotoUsuario/:id", upload.single("user"), userController.cadFotoUsuario)

export { userRoute };
