import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import AppError from "../../../../shared/errors/AppError";
import { IResetSenhaUserDTO } from "../../infra/entities/IUserDTO";

@injectable()
class ResetSenhaUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    senha,
    confirmaSenha,
    resetToken,
  }: IResetSenhaUserDTO): Promise<void> {
    
    function pad(value: any) {
      return value.toString().padStart(2, 0);
    }
    const dataAtual = new Date()

    const dataBanco =
      dataAtual.getFullYear() +
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

    const usuario = await this.userRepository.findByResetToken(resetToken);

    if (!usuario) {
      throw new AppError("token não encontrado ou expirado", 402);
    }

    const senhaHash = await bcrypt.hash(senha, 8);

    if (senha !== confirmaSenha) {
      throw new AppError("senhas não são iguais", 400);
    } else {
        await this.userRepository.resetSenha({
            id :usuario.id,
            senha : senhaHash,
            confirmaSenha: senhaHash,
            resetToken,
            updatedSenha_at: dataBanco
        })
    }
  }
}

export { ResetSenhaUseCase };
