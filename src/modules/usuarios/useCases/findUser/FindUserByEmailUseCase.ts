import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { IFindUserByEmailDTO } from "../../infra/entities/IUserDTO";

@injectable()
class FindUserByEmailUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(email: string): Promise<IFindUserByEmailDTO | null> {
    return await this.userRepository.findByEmail(email);
  }
}

export { FindUserByEmailUseCase };
