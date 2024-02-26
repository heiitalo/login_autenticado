import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { IFindUserByCPFDTO } from "../../infra/entities/IUserDTO";

@injectable()
class FindUserByCPFUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(cpf: string): Promise<IFindUserByCPFDTO | null> {
    return await this.userRepository.findByCPF(cpf);
  }
}

export { FindUserByCPFUseCase };
