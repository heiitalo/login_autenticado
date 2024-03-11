"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const User_routes_1 = require("../../../../modules/usuarios/routes/User.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/user", User_routes_1.userRoute);