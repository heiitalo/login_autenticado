"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdValidator = exports.getUserByCpfValidator = exports.getuserByEmailValidator = exports.getUserByNomeValidator = exports.updateUserValidator = exports.cadUserValidator = void 0;
const zod_1 = require("zod");
const cadUserValidator = zod_1.z.object({
    nome: zod_1.z.string({
        required_error: "campo nome é obrigátorio",
        invalid_type_error: "campo nome deve ser uma string",
    }),
    cpf: zod_1.z.string({
        required_error: "campo cpf é obrigátorio",
        invalid_type_error: "campo cpf deve ser uma string",
    }).min(11).max(11),
    email: zod_1.z
        .string({
        required_error: "campo email é obrigátorio",
        invalid_type_error: "campo email deve ser uma string",
    })
        .email("esse campo deve ser um email"),
    senha: zod_1.z.string({
        required_error: "campo senha é obrigátorio",
        invalid_type_error: "campo senha deve ser uma string",
    }),
    dt_nascimento: zod_1.z.preprocess((arg) => (typeof arg == "string" ? new Date(arg) : undefined), zod_1.z.date()),
});
exports.cadUserValidator = cadUserValidator;
const updateUserValidator = zod_1.z.object({
    nome: zod_1.z.string({
        invalid_type_error: "campo nome deve ser uma string",
    }).optional(),
    cpf: zod_1.z.string({
        invalid_type_error: "campo cpf deve ser uma string",
    }).min(11).max(11).optional(),
    email: zod_1.z
        .string({
        invalid_type_error: "campo email deve ser uma string",
    })
        .email("esse campo deve ser um email").optional(),
    dt_nascimento: zod_1.z.preprocess((arg) => (typeof arg == "string" ? new Date(arg) : undefined), zod_1.z.date()).optional(),
});
exports.updateUserValidator = updateUserValidator;
const getUserByNomeValidator = zod_1.z.object({
    nome: zod_1.z.string({
        required_error: "forneça um nome para pesquisa",
        invalid_type_error: "campo nome deve ser uma string",
    }),
});
exports.getUserByNomeValidator = getUserByNomeValidator;
const getuserByEmailValidator = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "forneça um email para pesquisa",
        invalid_type_error: "campo email deve ser uma string",
    })
        .email("esse campo deve ser um email"),
});
exports.getuserByEmailValidator = getuserByEmailValidator;
const getUserByCpfValidator = zod_1.z.object({
    cpf: zod_1.z.string({
        required_error: "forneça um cpf para pesquisa",
        invalid_type_error: "campo cpf deve ser uma string",
    }).min(11).max(11),
});
exports.getUserByCpfValidator = getUserByCpfValidator;
const getUserByIdValidator = zod_1.z.object({
    id: zod_1.z.string({
        required_error: "forneça um id para pesquisa",
        invalid_type_error: "campo id deve ser uma string",
    }),
});
exports.getUserByIdValidator = getUserByIdValidator;
//# sourceMappingURL=User.js.map