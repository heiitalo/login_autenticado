import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { IFindAllUserDTO } from "../../infra/entities/IUserDTO";
import AppError from "../../../../shared/errors/AppError";

@injectable()
class FindAllUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(): Promise<IFindAllUserDTO[] | null> {
    const usuarios = await this.userRepository.findAll();
    if(usuarios) {
      return usuarios
    }else {
      return null
    }
  }
}

export { FindAllUserUseCase };
