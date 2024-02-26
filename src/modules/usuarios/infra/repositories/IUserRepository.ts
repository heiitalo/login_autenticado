import { IFindTokenDTO, ILogOutDTO, ICadReseteTokenForuserDTO, IFindUserByResetTokenDTO, IResetSenhaUserDTO, ICadFotoUserDTO, IFindUserByNomelDTO } from "../entities/IUserDTO";
import { ICadUserDTO, IFindAllUserDTO, IFindUserByCPFDTO, IFindUserByEmailDTO, IFindUserByIdDTO, ILoginDTO, IUpdateUserDTO } from "../entities/IUserDTO";

interface IUserRepository {
  register(user: ICadUserDTO): Promise<void>;
  update(user: IUpdateUserDTO): Promise<void>
  findByEmail(email: string): Promise<IFindUserByEmailDTO |null>
  findByNome(nome: string): Promise<IFindUserByNomelDTO[] |null>
  findByCPF(cpf: string): Promise<IFindUserByCPFDTO |null>
  findById(id: string): Promise<IFindUserByIdDTO |null>
  findByResetToken(resetToken: string): Promise<IFindUserByResetTokenDTO | null>
  findAll(): Promise<IFindAllUserDTO[] | null>
  findForLogin(email: string): Promise<ILoginDTO | null>
  logOut(token: ILogOutDTO): Promise<void>
  findToken(token: IFindTokenDTO): Promise<IFindTokenDTO | null>
  registerTokenForPasswordReset(user: ICadReseteTokenForuserDTO): Promise<void>
  resetSenha(user: IResetSenhaUserDTO): Promise<void>
  cadFotoUser(user: ICadFotoUserDTO): Promise<void>
  
}

export { IUserRepository };
