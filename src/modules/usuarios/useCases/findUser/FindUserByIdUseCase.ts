import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { IFindUserByIdDTO } from "../../infra/entities/IUserDTO";

@injectable()
class FindUserByIdUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<IFindUserByIdDTO | null> {
    return this.userRepository.findById(id);
  }
}

export { FindUserByIdUseCase };
