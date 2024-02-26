import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { ICadUserDTO } from "../../infra/entities/IUserDTO";
import AppError from "../../../../shared/errors/AppError";

@injectable()
class CadUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    nome,
    cpf,
    email,
    senha,
    confirmarSenha,
    dt_nascimento,
    foto,
    
  }: ICadUserDTO): Promise<void> {
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

    let cpfLimpo = cpf.replace(".", "").replace(".", "").replace("-", "");
    const emailExists = await this.userRepository.findByEmail(email);
    const CPFExists = await this.userRepository.findByCPF(cpfLimpo);
    let dataFormatada = dt_nascimento + "T00:00:00.000Z";

    if (emailExists) {
      throw new AppError("email já cadastrado", 400);
    }

    if (CPFExists) {
      throw new AppError("cpf já cadastrado", 400);
    }

    const senhaHash = await bcrypt.hash(senha, 8);

    if (cpfLimpo && !/^\d+$/.test(cpfLimpo)) {
      throw new AppError("cpf deve ser somento numeros", 400);
    }

    if (senha !== confirmarSenha) {
      throw new AppError("senhas não são iguais", 400);
    } else {
      await this.userRepository.register({
        nome,
        cpf: cpfLimpo,
        email,
        senha: senhaHash,
        confirmarSenha: senhaHash,
        dt_nascimento: dataFormatada,
        foto,
        created_at: dataBanco,
      });
    }
  }
}

export { CadUserUseCase };
