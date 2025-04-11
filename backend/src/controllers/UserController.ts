import { Request, Response } from "express";
import userModel from "../models/user";
import IUser from "../types/interfaces/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../middlewares/jwt";

class UserController {
  public async createUser(req: Request, res: Response) {
    const { name, email, password, role } = req.body as IUser;
    const nPassword = await bcrypt.hash(password, 8);

    try {
      const data = await userModel.insertOne({
        name,
        email,
        password: nPassword,
        role,
      });
      res.status(201).json({ data });
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao criar usuário");
    }
  }
  public async readUser(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    try {
      const data = await userModel.findOne({ email: email });

      if (!data || !data.password)
        return res.status(404).send("Usuário não encontrado");

      await bcrypt
        .compare(password, data.password)
        .then((status) => {
          if (status == false)
            return res.status(500).send("Erro senha incorreta");

          const token = jwt.sign(data.id, jwtSecret, {});

          return res
            .status(200)
            .json({ message: "Sucesso no Login", token: token });
        })
        .catch((error) => {
          console.log(error);
          return res.status(401).send("Invalid password");
        });
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao buscar usuário");
    }
  }

  public async updatePassword(req: Request, res: Response): Promise<any> {
    const { email, currentPassword, newPassword } = req.body;

    try {
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res.status(404).send("Usuário não encontrado");
      }

      if (!user.password) {
        return res.status(400).send("Senha atual não encontrada");
      }
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).send("Senha atual incorreta");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 8);

      await userModel.updateOne(
        { email: email },
        { $set: { password: hashedNewPassword } }
      );

      return res.status(200).send("Senha atualizada com sucesso");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Erro ao atualizar a senha");
    }
  }
}

export default new UserController();
