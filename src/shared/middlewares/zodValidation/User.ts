import { z } from "zod";

const cadUserValidator = z.object({
  nome: z.string({
    required_error: "campo nome é obrigátorio",
    invalid_type_error: "campo nome deve ser uma string",
  }),

  cpf: z.string({
    required_error: "campo cpf é obrigátorio",
    invalid_type_error: "campo cpf deve ser uma string",
  }).min(11).max(11),

  email: z
    .string({
      required_error: "campo email é obrigátorio",
      invalid_type_error: "campo email deve ser uma string",
    })
    .email("esse campo deve ser um email"),

  senha: z.string({
    required_error: "campo senha é obrigátorio",
    invalid_type_error: "campo senha deve ser uma string",
  }),

  dt_nascimento: z.preprocess(
    (arg) => (typeof arg == "string" ? new Date(arg) : undefined),
    z.date()
  ),
});

const updateUserValidator = z.object({
  nome: z.string({
    invalid_type_error: "campo nome deve ser uma string",
  }).optional(),

  cpf: z.string({
    invalid_type_error: "campo cpf deve ser uma string",
  }).min(11).max(11).optional(),

  email: z
    .string({
      invalid_type_error: "campo email deve ser uma string",
    })
    .email("esse campo deve ser um email").optional(),

  dt_nascimento: z.preprocess(
    (arg) => (typeof arg == "string" ? new Date(arg) : undefined),
    z.date()
  ).optional(),
});

const getUserByNomeValidator = z.object({
  nome: z.string({
    required_error: "forneça um nome para pesquisa",
    invalid_type_error: "campo nome deve ser uma string",
  }),
});

const getuserByEmailValidator = z.object({
  email: z
  .string({
    required_error: "forneça um email para pesquisa",
    invalid_type_error: "campo email deve ser uma string",
  })
  .email("esse campo deve ser um email"),
});

const getUserByCpfValidator = z.object({
  cpf: z.string({
    required_error: "forneça um cpf para pesquisa",
    invalid_type_error: "campo cpf deve ser uma string",
  }).min(11).max(11),
})

const getUserByIdValidator = z.object({
  id: z.string({
    required_error: "forneça um id para pesquisa",
    invalid_type_error: "campo id deve ser uma string",
  }),
})


export { cadUserValidator, updateUserValidator, getUserByNomeValidator, getuserByEmailValidator, getUserByCpfValidator, getUserByIdValidator };
