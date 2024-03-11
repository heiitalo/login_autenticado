"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const zod_express_middleware_1 = require("zod-express-middleware");
const User_1 = require("../../../shared/middlewares/zodValidation/User");
const AuthMiddlewareUser_1 = require("../../../shared/middlewares/token/AuthMiddlewareUser");
const upload = require("../../../shared/middlewares/multer/uploadImage");
const userRoute = (0, express_1.Router)();
exports.userRoute = userRoute;
const userController = new UserController_1.UserController();
userRoute.post("/login", userController.login);
userRoute.get("/logout", AuthMiddlewareUser_1.checkToken, userController.logout);
userRoute.post("/cadUsuario", (0, zod_express_middleware_1.validateRequestBody)(User_1.cadUserValidator), userController.register);
userRoute.patch("/updateUsuario", AuthMiddlewareUser_1.checkToken, (0, zod_express_middleware_1.validateRequestBody)(User_1.updateUserValidator), userController.update);
userRoute.get("/getAllUsuario", AuthMiddlewareUser_1.checkToken, userController.getAll);
userRoute.get("/getUsuarioByNome/:nome", AuthMiddlewareUser_1.checkToken, (0, zod_express_middleware_1.validateRequestParams)(User_1.getUserByNomeValidator), userController.getByNome);
userRoute.get("/getUsuarioByEmail/:email", AuthMiddlewareUser_1.checkToken, (0, zod_express_middleware_1.validateRequestParams)(User_1.getuserByEmailValidator), userController.getByEmail);
userRoute.get("/getUsuarioByCPF/:cpf", AuthMiddlewareUser_1.checkToken, (0, zod_express_middleware_1.validateRequestParams)(User_1.getUserByCpfValidator), userController.getByCPF);
userRoute.get("/getUsuarioById/:id", AuthMiddlewareUser_1.checkToken, (0, zod_express_middleware_1.validateRequestParams)(User_1.getUserByIdValidator), userController.getById);
userRoute.post("/envioEmailRecuperarSenha", userController.envioDeEmailtrocaDeSenha);
userRoute.patch("/resetSenha/:resetToken", userController.resetSenha);
userRoute.patch("/cadFotoUsuario/:id", upload.single("user"), userController.cadFotoUsuario);
