import { Request, Response } from "express";
import { container } from "tsyringe";
import { CadUserUseCase } from "../useCases/cadUser/CadUserUseCase";
import { FindAllUserUseCase } from "../useCases/findUser/FindAllUserUseCase";
import { UserLoginUseCase } from "../useCases/loginUser/UserLoginUseCase";
import { UpdateUserUseCase } from "../useCases/updateUser/UpdateUserUseCase";
import { UserLogOutUseCase } from "../useCases/loginUser/UserLogoutUseCase";
import { EnvioDeEmailParaRedefinicaoDeSenhaUseCase } from "../useCases/redefinicaoDeSenha/EnvioDeEmailParaRedefinicaoDeSenhaUseCase";
import { ResetSenhaUseCase } from "../useCases/redefinicaoDeSenha/ResetSenhaUseCase";
import { CadFotoUserUseCase } from "../useCases/cadUser/CadFotoUserUseCase";
import { FindUserByNomeUseCase } from "../useCases/findUser/FindUserByNomeUseCase";
import { FindUserByEmailUseCase } from "../useCases/findUser/FindUserByEmailUseCase";
import { FindUserByCPFUseCase } from "../useCases/findUser/FindUserByCPFUseCase";
import { FindUserByIdUseCase } from "../useCases/findUser/FindUserByIdUseCase";

class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    const { nome, cpf, email, senha, confirmarSenha, dt_nascimento } = req.body;
    const imagem = req.file;
    console.log(req);

    const cadUserUseCase = container.resolve(CadUserUseCase);

    try {
      await cadUserUseCase.execute({
        nome,
        cpf,
        email,
        senha,
        confirmarSenha,
        dt_nascimento,
      });
      return res.status(201).json({
        message: "Usuario cadastrado!",
      });
    } catch (error) {
      return res.status(400).json({
        error,
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { nome, cpf, email, dt_nascimento } = req.body;
    const id = res.locals.id;

    // const authHeader = req.headers["authorization"];
    // const token = authHeader?.split(" ")[1];

    const updateUsuario = container.resolve(UpdateUserUseCase);

    try {
      await updateUsuario.execute({ id, nome, cpf, email, dt_nascimento });
      return res.status(201).json({
        message: "Usuario atualizado",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const findAllUsers = container.resolve(FindAllUserUseCase);
    const users = await findAllUsers.execute();

    try {
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  async getByNome(req: Request, res: Response): Promise<Response> {
    const { nome } = req.params;

    const findByNome = container.resolve(FindUserByNomeUseCase);
    const users = await findByNome.execute(nome);

    try {
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  async getByEmail(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;

    const findByEmail = container.resolve(FindUserByEmailUseCase);
    const user = await findByEmail.execute(email);

    try {
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findById = container.resolve(FindUserByIdUseCase);
    const user = await findById.execute(id);

    try {
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  async getByCPF(req: Request, res: Response): Promise<Response> {
    const { cpf } = req.params;

    const findByCPF = container.resolve(FindUserByCPFUseCase);
    const user = await findByCPF.execute(cpf);

    try {
      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, senha } = req.body;

    const loginUserUseCase = container.resolve(UserLoginUseCase);

    try {
      const token = await loginUserUseCase.execute({ email, senha });
      return res.status(202).json({
        message: "login OK",
        token: token,
      });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: err });
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    console.log(token);
    const addTokenBackList = container.resolve(UserLogOutUseCase);

    try {
      if (token) {
        await addTokenBackList.execute({ token });
      }
      return res.status(200).json({ message: "Logout!" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  async envioDeEmailtrocaDeSenha(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { email } = req.body;

    const envioDeEmail = container.resolve(
      EnvioDeEmailParaRedefinicaoDeSenhaUseCase
    );

    try {
      await envioDeEmail.execute({ email });
      return res.status(200).json({ message: "email enviado" });
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  async resetSenha(req: Request, res: Response): Promise<Response> {
    const { senha, confirmaSenha } = req.body;
    const { resetToken } = req.params;

    const resetSenha = container.resolve(ResetSenhaUseCase);
    try {
      await resetSenha.execute({ senha, confirmaSenha, resetToken });
      return res.status(200).json({});
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async cadFotoUsuario(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const imagem = req.file;
    const foto = imagem?.destination + "/" + imagem?.filename;
    console.log(foto);
    const cadFotoUsuario = container.resolve(CadFotoUserUseCase);
    try {
      await cadFotoUsuario.execute({ id, foto });
      return res.status(200).json(imagem);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}

export { UserController };
