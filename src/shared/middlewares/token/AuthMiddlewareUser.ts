import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { container } from "tsyringe";
import { CheckTokenInBackList } from "../../../modules/usuarios/useCases/loginUser/CheckTokenInBackList";

type JwtPayload = {
  id: number;
};

async function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const secret = "italoTest325945";

  const verifyTokenExistsInBackList = container.resolve(CheckTokenInBackList);

  if (!token) {
    return res.status(403).json({ message: "acesso negado!" });
  }
  const verifyToken = await verifyTokenExistsInBackList.execute({ token });

  if (verifyToken) {
    return res.status(403).json({ message: "token inválido! teste" });
  }

  try {
    const { id } = jwt.verify(token, secret) as JwtPayload;

    function parseJwt(token: string) {
      return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    }
    const decode = parseJwt(token);

    res.locals.nome = decode.nome;
    res.locals.id = decode.id;

    next();
  } catch (error) {
    res.status(403).json({ message: "token inválido!" });
  }
}

export { checkToken };
