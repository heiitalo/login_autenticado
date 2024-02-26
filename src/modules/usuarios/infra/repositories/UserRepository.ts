import prismaClient from "../../../../shared/infra/prisma/prismaClient";
import {
  ICadUserDTO,
  IFindAllUserDTO,
  IFindTokenDTO,
  IFindUserByCPFDTO,
  IFindUserByEmailDTO,
  IFindUserByIdDTO,
  ILogOutDTO,
  ILoginDTO,
  IUpdateUserDTO,
  ICadReseteTokenForuserDTO,
  IFindUserByResetTokenDTO,
  IResetSenhaUserDTO,
  ICadFotoUserDTO,
  IFindUserByNomelDTO,
} from "../entities/IUserDTO";
import { IUserRepository } from "./IUserRepository";

class UserRepository implements IUserRepository {
  async register({
    nome,
    cpf,
    email,
    senha,
    dt_nascimento,
    foto,
    created_at,
  }: ICadUserDTO): Promise<void> {
    await prismaClient.user.create({
      data: {
        nome,
        cpf,
        email,
        senha,
        dt_nascimento,
        foto,
        created_at,
      },
    });
  }

  async update({
    id,
    nome,
    cpf,
    email,
    dt_nascimento,
    foto,
    updated_at,
  }: IUpdateUserDTO): Promise<void> {
    await prismaClient.user.update({
      where: { id },
      data: {
        nome,
        cpf,
        email,
        dt_nascimento,
        foto,
        updated_at,
      },
    });
  }

  async findByEmail(email: string): Promise<IFindUserByEmailDTO | null> {
    return await prismaClient.user.findFirst({
      where: { email },
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
        dt_nascimento: true,
        foto: true,
        created_at: true,
        updated_at: true,
        updatedSenha_at: true
      },
    });
  }

  async findByCPF(cpf: string): Promise<IFindUserByCPFDTO | null> {
    return await prismaClient.user.findFirst({
      where: { cpf },
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
        dt_nascimento: true,
        foto: true,
        created_at: true,
        updated_at: true,
        updatedSenha_at: true
      },
    });
  }

  async findByNome(nome: string): Promise<IFindUserByNomelDTO[] | null> {
    return await prismaClient.user.findMany({
      where: {
        nome: {
          contains: nome
        }
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
        dt_nascimento: true,
        foto: true,
        created_at: true,
        updated_at: true,
        updatedSenha_at: true
      },
    })
  }

  async findById(id: string): Promise<IFindUserByIdDTO | null> {
    return await prismaClient.user.findFirst({
      where: { id },
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
        dt_nascimento: true,
        foto: true,
        created_at: true,
        updated_at: true,
        updatedSenha_at: true
      },
    });
  }

  async findByResetToken(
    resetToken: string
  ): Promise<IFindUserByResetTokenDTO | null> {
    return await prismaClient.user.findFirst({
      where: { resetToken },
    });
  }

  async findAll(): Promise<IFindAllUserDTO[] | null> {
    return await prismaClient.user.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        email: true,
        dt_nascimento: true,
        foto: true,
        created_at: true,
        updated_at: true,
        updatedSenha_at: true
      },
    });
  }

  async findForLogin(email: string): Promise<ILoginDTO | null> {
    return await prismaClient.user.findFirst({
      where: { email },
    });
  }

  async logOut({ token }: ILogOutDTO): Promise<void> {
    await prismaClient.backList.create({
      data: { token },
    });
  }

  async findToken({ token }: IFindTokenDTO): Promise<IFindTokenDTO | null> {
    return await prismaClient.backList.findFirst({
      where: { token },
    });
  }

  async registerTokenForPasswordReset({
    email,
    resetToken,
  }: ICadReseteTokenForuserDTO): Promise<void> {
    await prismaClient.user.update({
      where: { email },
      data: {
        resetToken,
      },
    });
  }

  async resetSenha({
    id,
    senha,
    updatedSenha_at,
  }: IResetSenhaUserDTO): Promise<void> {
    await prismaClient.user.update({
      where: { id },
      data: { senha, updatedSenha_at },
    });
  }

  async cadFotoUser({ id, foto }: ICadFotoUserDTO): Promise<void> {
    await prismaClient.user.update({
      where: { id },
      data: { foto },
    });
  }
}

export { UserRepository };
