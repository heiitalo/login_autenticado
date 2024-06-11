import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { ILoginDTO } from "../../infra/entities/IUserDTO";
import AppError from "../../../../shared/errors/AppError";

@injectable()
class UserLoginUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, senha }: ILoginDTO): Promise<string> {
    const user = await this.userRepository.findForLogin(email);

    if (user) {
      const verifySenha = await bcrypt.compare(senha, user.senha);

      if (!verifySenha) {
        throw new AppError("senha inválida", 402);
      }
      const key = process.env.SECRET_KEY;
      const token = jwt.sign({ id: user.id }, key!, {
        expiresIn: "8h",
      });
      return token;
    } else {
      throw new AppError("email inválido", 402);
    }
  }
}

export { UserLoginUseCase };
