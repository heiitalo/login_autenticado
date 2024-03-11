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
exports.EnvioDeEmailParaRedefinicaoDeSenhaUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RecuperarSenha_1 = require("../../../../shared/sendEmail/usuario/RecuperarSenha");
const AppError_1 = __importDefault(require("../../../../shared/errors/AppError"));
let EnvioDeEmailParaRedefinicaoDeSenhaUseCase = class EnvioDeEmailParaRedefinicaoDeSenhaUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute({ email, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield this.userRepository.findByEmail(email);
            if (usuario) {
                const resetToken = jsonwebtoken_1.default.sign({ id: usuario.id }, "italoTest325945", {
                    expiresIn: "30m",
                });
                yield this.userRepository.registerTokenForPasswordReset({
                    email,
                    resetToken,
                });
                const smtp = new RecuperarSenha_1.SendEmailRecuperarSenha();
                let html = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Recuperação de Senha</title>
                    <style>
                        /* Estilos gerais */
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }
                        h1, p {
                            text-align: center;
                        }
                        .btn {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #007bff;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .btn:hover {
                            background-color: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Recuperação de Senha</h1>
                        <p>Olá, parece que você solicitou uma recuperação de senha para sua conta. Clique no botão abaixo para redefinir sua senha:</p>
                        <p><a href="#" class="btn">Redefinir Senha</a></p>
                        <p>Se você não solicitou essa alteração, pode ignorar este email.</p>
                        <p>Obrigado,<br>Equipe de Suporte</p>
                    </div>
                </body>
                </html>
                `;
                smtp.execute(email, "recuperação de senha", html);
            }
            else {
                throw new AppError_1.default("email nao encontrado", 400);
            }
        });
    }
};
exports.EnvioDeEmailParaRedefinicaoDeSenhaUseCase = EnvioDeEmailParaRedefinicaoDeSenhaUseCase;
exports.EnvioDeEmailParaRedefinicaoDeSenhaUseCase = EnvioDeEmailParaRedefinicaoDeSenhaUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [Object])
], EnvioDeEmailParaRedefinicaoDeSenhaUseCase);
