import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../infra/repositories/IUserRepository";
import { ICadFotoUserDTO } from "../../infra/entities/IUserDTO";

@injectable()
class CadFotoUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ id, foto }: ICadFotoUserDTO): Promise<void> {
    await this.userRepository.cadFotoUser({
      id,
      foto,
    });
  }
}

export { CadFotoUserUseCase };
