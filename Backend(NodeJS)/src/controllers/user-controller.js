import UserRepository from "../repository/user-repository.js";
const userRepository = new UserRepository();
import { StatusCodes } from "http-status-codes";
function generateRandomPassword(name) {
  if (!name) {
    throw { msg: "Please provide name" };
  }

  const len = name.length;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  console.log("Generated password: ", password);

  return password;
}

export const signUp = async (req, res) => {
  try {
    console.log("Request recieved");

    const password = generateRandomPassword(req.body.name);
    const user = await userRepository.create({
      name: req.body.name,
      email: req.body.email,
      password: password,
      roles: req.body.roles,
    });
    return res.status(StatusCodes.CREATED).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      mssage: "not able to create user",
      data: "",
      err: error,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await userRepository.getUserByEmail(req.body.email);
    // console.log(user);
    if (!user) {
      throw {
        message: "User not found",
      };
    }
    if (!user.comparePassword(req.body.password)) {
      throw {
        message: "Incorrect Password",
      };
    }
    const token = user.createToken(user);
    return res.status(StatusCodes.OK).json({
      message: "user logged-in successfully",
      data: token,
      roles: user.roles,
    });
  } catch (error) {
    console.log(error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      mssage: "not able to login user",
      data: null,
      err: error,
    });
  }
};
