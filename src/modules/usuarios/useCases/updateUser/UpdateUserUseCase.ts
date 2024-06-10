import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { IUpdateUserDTO } from "../../infra/entities/IUserDTO";
import AppError from "../../../../shared/errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    id,
    nome,
    cpf,
    email,
    dt_nascimento,
    foto,
  }: IUpdateUserDTO): Promise<void> {
    function pad(value: any) {
      return value.toString().padStart(2, 0);
    }
    const dataAtual = new Date();

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

    if (email) {
      const emailExists = await this.userRepository.findByEmail(email);
      if (emailExists && emailExists.id != id) {
        throw new AppError("email já cadastrado", 402);
      }
    }

    if (cpf) {
      const cpfExists = await this.userRepository.findByCPF(cpf);
      if (cpfExists && cpfExists.id != id) {
        throw new AppError("cpf já cadastrado", 402);
      }
    }
    if (cpf && !/^\d+$/.test(cpf)) {
      throw new AppError("cpf deve ser somento numeros", 400);
    }
    await this.userRepository.update({
      id,
      nome,
      cpf,
      email,
      dt_nascimento,
      foto,
      updated_at: dataBanco,
    });
  }
}

export { UpdateUserUseCase };
