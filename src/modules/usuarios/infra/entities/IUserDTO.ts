export interface IUserDTO {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  dt_nascimento: Date;
  reseteToken: string;
  foto: string;
  created_at: Date;
  updated_at: Date;
  updatedSenha_at: Date
}

export interface ICadUserDTO {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  dt_nascimento: string;
  foto?: string;
  created_at?: string | null;
}

export interface IFindUserByEmailDTO {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dt_nascimento: Date;
  foto?: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  updatedSenha_at: Date | null
}

export interface IFindUserByNomelDTO {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dt_nascimento: Date;
  foto?: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  updatedSenha_at: Date | null
}

export interface IFindUserByCPFDTO {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dt_nascimento: Date;
  foto?: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  updatedSenha_at: Date | null
}

export interface IFindAllUserDTO {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dt_nascimento: Date;
  foto?: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  updatedSenha_at: Date | null
}

export interface IFindUserByIdDTO {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dt_nascimento: Date;
  foto?: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  updatedSenha_at: Date | null
}
export interface IFindUserByResetTokenDTO {
  id: string;
  resetToken: string | null;
}

export interface ILoginDTO {
  id?: string;
  email: string;
  senha: string;
}

export interface ILogOutDTO {
  token: string;
}

export interface IFindTokenDTO {
  token: string;
}

export interface IUpdateUserDTO {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  dt_nascimento: string;
  foto?: string,
  updated_at?: string;
}

export interface IEnvioDeEmailParaRedefinicaoDeSenhaDTO {
  email: string;
}

export interface ICadReseteTokenForuserDTO {
  email: string;
  resetToken: string;
}

export interface IResetSenhaUserDTO {
  id?: string;
  senha: string;
  confirmaSenha: string;
  resetToken: string;
  updatedSenha_at?: string | null
}

export interface ICadFotoUserDTO {
  id: string;
  foto: string | null;
}
