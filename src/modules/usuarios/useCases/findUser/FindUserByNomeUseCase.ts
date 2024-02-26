import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { IFindUserByNomelDTO } from "../../infra/entities/IUserDTO";

@injectable()
class FindUserByNomeUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(nome: string): Promise<IFindUserByNomelDTO[] | null> {
    console.log(nome);
    return await this.userRepository.findByNome(nome);
  }
}

export { FindUserByNomeUseCase };
