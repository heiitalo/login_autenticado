import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { ILogOutDTO } from "../../infra/entities/IUserDTO";

@injectable()
class UserLogOutUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ token }: ILogOutDTO): Promise<void> {
    await this.userRepository.logOut({ token });
  }
}

export { UserLogOutUseCase };
