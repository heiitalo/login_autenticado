import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { IFindTokenDTO } from "../../infra/entities/IUserDTO";

@injectable()
class CheckTokenInBackList {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ token }: IFindTokenDTO): Promise<IFindTokenDTO | null> {
    return await this.userRepository.findToken({ token });
  }
}

export { CheckTokenInBackList };
