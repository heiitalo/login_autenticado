import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { IEnvioDeEmailParaRedefinicaoDeSenhaDTO } from "../../infra/entities/IUserDTO";
import { SendEmailRecuperarSenha } from "../../../../shared/sendEmail/usuario/RecuperarSenha";
import AppError from "../../../../shared/errors/AppError";

@injectable()
class EnvioDeEmailParaRedefinicaoDeSenhaUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    email,
  }: IEnvioDeEmailParaRedefinicaoDeSenhaDTO): Promise<void> {
    const usuario = await this.userRepository.findByEmail(email);

    if (usuario) {
      const resetToken = jwt.sign({ id: usuario.id }, "italoTest325945", {
        expiresIn: "30m",
      });
      await this.userRepository.registerTokenForPasswordReset({
        email,
        resetToken,
      });
      const smtp = new SendEmailRecuperarSenha();
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
    } else {
      throw new AppError("email nao encontrado", 400);
    }
  }
}

export { EnvioDeEmailParaRedefinicaoDeSenhaUseCase };
