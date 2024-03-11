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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsyringe_1 = require("tsyringe");
const CadUserUseCase_1 = require("../useCases/cadUser/CadUserUseCase");
const FindAllUserUseCase_1 = require("../useCases/findUser/FindAllUserUseCase");
const UserLoginUseCase_1 = require("../useCases/loginUser/UserLoginUseCase");
const UpdateUserUseCase_1 = require("../useCases/updateUser/UpdateUserUseCase");
const UserLogoutUseCase_1 = require("../useCases/loginUser/UserLogoutUseCase");
const EnvioDeEmailParaRedefinicaoDeSenhaUseCase_1 = require("../useCases/redefinicaoDeSenha/EnvioDeEmailParaRedefinicaoDeSenhaUseCase");
const ResetSenhaUseCase_1 = require("../useCases/redefinicaoDeSenha/ResetSenhaUseCase");
const CadFotoUserUseCase_1 = require("../useCases/cadUser/CadFotoUserUseCase");
const FindUserByNomeUseCase_1 = require("../useCases/findUser/FindUserByNomeUseCase");
const FindUserByEmailUseCase_1 = require("../useCases/findUser/FindUserByEmailUseCase");
const FindUserByCPFUseCase_1 = require("../useCases/findUser/FindUserByCPFUseCase");
const FindUserByIdUseCase_1 = require("../useCases/findUser/FindUserByIdUseCase");
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, cpf, email, senha, confirmarSenha, dt_nascimento } = req.body;
            const imagem = req.file;
            console.log(req);
            const cadUserUseCase = tsyringe_1.container.resolve(CadUserUseCase_1.CadUserUseCase);
            try {
                yield cadUserUseCase.execute({
                    nome,
                    cpf,
                    email,
                    senha,
                    confirmarSenha,
                    dt_nascimento,
                });
                return res.status(201).json({
                    message: "Usuario cadastrado!",
                });
            }
            catch (error) {
                return res.status(400).json({
                    error,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, cpf, email, dt_nascimento } = req.body;
            const id = res.locals.id;
            // const authHeader = req.headers["authorization"];
            // const token = authHeader?.split(" ")[1];
            const updateUsuario = tsyringe_1.container.resolve(UpdateUserUseCase_1.UpdateUserUseCase);
            try {
                yield updateUsuario.execute({ id, nome, cpf, email, dt_nascimento });
                return res.status(201).json({
                    message: "Usuario atualizado",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ error });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const findAllUsers = tsyringe_1.container.resolve(FindAllUserUseCase_1.FindAllUserUseCase);
            const users = yield findAllUsers.execute();
            try {
                return res.status(200).json(users);
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
    getByNome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome } = req.params;
            const findByNome = tsyringe_1.container.resolve(FindUserByNomeUseCase_1.FindUserByNomeUseCase);
            const users = yield findByNome.execute(nome);
            try {
                return res.status(200).json(users);
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
    getByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const findByEmail = tsyringe_1.container.resolve(FindUserByEmailUseCase_1.FindUserByEmailUseCase);
            const user = yield findByEmail.execute(email);
            try {
                return res.status(200).json(user);
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const findById = tsyringe_1.container.resolve(FindUserByIdUseCase_1.FindUserByIdUseCase);
            const user = yield findById.execute(id);
            try {
                return res.status(200).json(user);
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
    getByCPF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cpf } = req.params;
            const findByCPF = tsyringe_1.container.resolve(FindUserByCPFUseCase_1.FindUserByCPFUseCase);
            const user = yield findByCPF.execute(cpf);
            try {
                return res.status(200).json(user);
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            const loginUserUseCase = tsyringe_1.container.resolve(UserLoginUseCase_1.UserLoginUseCase);
            try {
                const token = yield loginUserUseCase.execute({ email, senha });
                return res.status(202).json({
                    message: "login OK",
                    token: token,
                });
            }
            catch (err) {
                console.log(err);
                return res.status(401).json({ message: err });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers["authorization"];
            const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
            console.log(token);
            const addTokenBackList = tsyringe_1.container.resolve(UserLogoutUseCase_1.UserLogOutUseCase);
            try {
                if (token) {
                    yield addTokenBackList.execute({ token });
                }
                return res.status(200).json({ message: "Logout!" });
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ error });
            }
        });
    }
    envioDeEmailtrocaDeSenha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const envioDeEmail = tsyringe_1.container.resolve(EnvioDeEmailParaRedefinicaoDeSenhaUseCase_1.EnvioDeEmailParaRedefinicaoDeSenhaUseCase);
            try {
                yield envioDeEmail.execute({ email });
                return res.status(200).json({ message: "email enviado" });
            }
            catch (err) {
                return res.status(401).json(err);
            }
        });
    }
    resetSenha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senha, confirmaSenha } = req.body;
            const { resetToken } = req.params;
            const resetSenha = tsyringe_1.container.resolve(ResetSenhaUseCase_1.ResetSenhaUseCase);
            try {
                yield resetSenha.execute({ senha, confirmaSenha, resetToken });
                return res.status(200).json({});
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    }
    cadFotoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const imagem = req.file;
            const foto = (imagem === null || imagem === void 0 ? void 0 : imagem.destination) + "/" + (imagem === null || imagem === void 0 ? void 0 : imagem.filename);
            console.log(foto);
            const cadFotoUsuario = tsyringe_1.container.resolve(CadFotoUserUseCase_1.CadFotoUserUseCase);
            try {
                yield cadFotoUsuario.execute({ id, foto });
                return res.status(200).json(imagem);
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map