import { container } from "tsyringe";

import { IUserRepository } from "../../modules/usuarios/infra/repositories/IUserRepository";
import { UserRepository } from "../../modules/usuarios/infra/repositories/UserRepository";

container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
  );
