import User from "../users/user.model.js";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-JWT.js";

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword
    });

    return res.status(200).json({
      msg: "user has been added to database",
      userDetails: {
        user: user.username,
        email: user.email,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("No se pudo registrar el usuario");
  }
};
export const login = async (req, res) => {
  const { user, password } = req.body;
  try {
      const userLog = await User.findOne({
          $or: [{ username: user }]
      });
      //verifico que el usuario existe
      if (!userLog) {
          return res.status(400).json({
              msg: "Credentials not valid"
          });
      }
      //verifico que la clave del usuario sea igual
      const verifyPassword = bcryptjs.compareSync(password, userLog.password);
      if (!verifyPassword) {
          return res.status(400).json({
              msg: "Password is incorrect"
          });
      }
      const token = await generateJWT(userLog.id);
      res.status(200).json({
          msg: "YOU ARE LOGGED IN THE APP",
          userLog,
          token
      });

  } catch (error) {
      console.log(error);
      res.status(500).json({
          msg: "Contact administrator"
      });
  }
}