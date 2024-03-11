"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ResetSenhaUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../../../../shared/errors/AppError"));
let ResetSenhaUseCase = class ResetSenhaUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute({ senha, confirmaSenha, resetToken, }) {
        return __awaiter(this, void 0, void 0, function* () {
            function pad(value) {
                return value.toString().padStart(2, 0);
            }
            const dataAtual = new Date();
            const dataBanco = dataAtual.getFullYear() +
                "-" +
                pad(dataAtual.getMonth() + 1) +
                "-" +
                pad(dataAtual.getDate()) +
                "T" +
                pad(dataAtual.getHours()) +
                ":" +
                pad(dataAtual.getMinutes()) +
                ":" +
                pad(dataAtual.getSeconds()) +
                ".000Z";
            const usuario = yield this.userRepository.findByResetToken(resetToken);
            if (!usuario) {
                throw new AppError_1.default("token não encontrado ou expirado", 402);
            }
            const senhaHash = yield bcryptjs_1.default.hash(senha, 8);
            if (senha !== confirmaSenha) {
                throw new AppError_1.default("senhas não são iguais", 400);
            }
            else {
                yield this.userRepository.resetSenha({
                    id: usuario.id,
                    senha: senhaHash,
                    confirmaSenha: senhaHash,
                    resetToken,
                    updatedSenha_at: dataBanco
                });
            }
        });
    }
};
exports.ResetSenhaUseCase = ResetSenhaUseCase;
exports.ResetSenhaUseCase = ResetSenhaUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [Object])
], ResetSenhaUseCase);
