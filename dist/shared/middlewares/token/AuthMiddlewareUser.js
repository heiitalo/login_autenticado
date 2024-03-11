"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tsyringe_1 = require("tsyringe");
const CheckTokenInBackList_1 = require("../../../modules/usuarios/useCases/loginUser/CheckTokenInBackList");
function checkToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        const secret = "italoTest325945";
        const verifyTokenExistsInBackList = tsyringe_1.container.resolve(CheckTokenInBackList_1.CheckTokenInBackList);
        if (!token) {
            return res.status(403).json({ message: "acesso negado!" });
        }
        const verifyToken = yield verifyTokenExistsInBackList.execute({ token });
        if (verifyToken) {
            return res.status(403).json({ message: "token inválido! teste" });
        }
        try {
            const { id } = jsonwebtoken_1.default.verify(token, secret);
            function parseJwt(token) {
                return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
            }
            const decode = parseJwt(token);
            res.locals.nome = decode.nome;
            res.locals.id = decode.id;
            next();
        }
        catch (error) {
            res.status(403).json({ message: "token inválido!" });
        }
    });
}
exports.checkToken = checkToken;
