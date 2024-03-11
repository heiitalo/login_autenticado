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
exports.UserRepository = void 0;
const prismaClient_1 = __importDefault(require("../../../../shared/infra/prisma/prismaClient"));
class UserRepository {
    register({ nome, cpf, email, senha, dt_nascimento, foto, created_at, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.user.create({
                data: {
                    nome,
                    cpf,
                    email,
                    senha,
                    dt_nascimento,
                    foto,
                    created_at,
                },
            });
        });
    }
    update({ id, nome, cpf, email, dt_nascimento, foto, updated_at, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.user.update({
                where: { id },
                data: {
                    nome,
                    cpf,
                    email,
                    dt_nascimento,
                    foto,
                    updated_at,
                },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findFirst({
                where: { email },
                select: {
                    id: true,
                    nome: true,
                    cpf: true,
                    email: true,
                    dt_nascimento: true,
                    foto: true,
                    created_at: true,
                    updated_at: true,
                    updatedSenha_at: true
                },
            });
        });
    }
    findByCPF(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findFirst({
                where: { cpf },
                select: {
                    id: true,
                    nome: true,
                    cpf: true,
                    email: true,
                    dt_nascimento: true,
                    foto: true,
                    created_at: true,
                    updated_at: true,
                    updatedSenha_at: true
                },
            });
        });
    }
    findByNome(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findMany({
                where: {
                    nome: {
                        contains: nome
                    }
                },
                select: {
                    id: true,
                    nome: true,
                    cpf: true,
                    email: true,
                    dt_nascimento: true,
                    foto: true,
                    created_at: true,
                    updated_at: true,
                    updatedSenha_at: true
                },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findFirst({
                where: { id },
                select: {
                    id: true,
                    nome: true,
                    cpf: true,
                    email: true,
                    dt_nascimento: true,
                    foto: true,
                    created_at: true,
                    updated_at: true,
                    updatedSenha_at: true
                },
            });
        });
    }
    findByResetToken(resetToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findFirst({
                where: { resetToken },
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findMany({
                select: {
                    id: true,
                    nome: true,
                    cpf: true,
                    email: true,
                    dt_nascimento: true,
                    foto: true,
                    created_at: true,
                    updated_at: true,
                    updatedSenha_at: true
                },
            });
        });
    }
    findForLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.user.findFirst({
                where: { email },
            });
        });
    }
    logOut({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.backList.create({
                data: { token },
            });
        });
    }
    findToken({ token }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prismaClient_1.default.backList.findFirst({
                where: { token },
            });
        });
    }
    registerTokenForPasswordReset({ email, resetToken, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.user.update({
                where: { email },
                data: {
                    resetToken,
                },
            });
        });
    }
    resetSenha({ id, senha, updatedSenha_at, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.user.update({
                where: { id },
                data: { senha, updatedSenha_at },
            });
        });
    }
    cadFotoUser({ id, foto }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prismaClient_1.default.user.update({
                where: { id },
                data: { foto },
            });
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map