"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Incluir as bibliotecas
// Upload de arquivos
//const multer  = require('multer');
const multer_1 = __importDefault(require("multer"));
// Realizar upload da imagem
module.exports = (0, multer_1.default)({
    // diskStorage permite manipular locar para salvar a imagem
    storage: multer_1.default.diskStorage({
        // Local para salvar a imagem
        destination: (req, file, cb) => {
            cb(null, "./src/shared/assets/uploads");
        },
        // Nome que deve ser atribuido ao arquivo
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname);
        },
    }),
    // Validar a extensão do arquivo
    fileFilter: (req, file, cb) => {
        // Verificar se a extensão da imagem enviada pelo usuário está no array de extensões
        const extesaoImg = ["image/png", "image/jpg", "image/jpeg"].find((formatoAceito) => formatoAceito == file.mimetype);
        // Retornar TRUE quando a extensão da imagem é válida
        if (extesaoImg) {
            return cb(null, true);
        }
        // Retornar FALSE quando a extensão da imagem é válida
        return cb(null, false);
    },
});
