import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { IFindAllUserDTO } from "../../infra/entities/IUserDTO";

@injectable()
class FindAllUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(): Promise<IFindAllUserDTO[] | null> {
    return await this.userRepository.findAll();
  }
}

export { FindAllUserUseCase };
