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
exports.SendEmailRecuperarSenha = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class SendEmailRecuperarSenha {
    constructor() { }
    execute(to, subject, html) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: 'italoenviodeemail@gmail.com',
                    pass: 'lvhi qoaj uflm kexd '
                }
            });
            yield transport.sendMail({
                from: 'Time de suporte <italoenviodeemail@gmail.com>',
                to: to,
                subject: subject,
                html: html
            }).catch((err) => console.log(err));
        });
    }
}
exports.SendEmailRecuperarSenha = SendEmailRecuperarSenha;
