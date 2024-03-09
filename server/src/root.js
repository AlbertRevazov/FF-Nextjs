require("dotenv").config();
const { Users } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const root = {
  getMe: async ({ token }) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await Users.findOne({ where: { id: decoded.id } });
      if (!user) {
        return { message: "Нет такого аккаунта" };
      } else {
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "30d" }
        );
        user.token = token;
        user.message = "Вы вошли в систему";
        return user;
      }
    } catch (error) {
      return { message: "Нет доступа!" };
    }
  },
  getUserLogin: async ({ input }) => {
    try {
      const { email, password } = input;
      const user = await Users.findOne({ where: { email } });
      if (!user) {
        return { message: "Такой пользователь не существует" };
      }
      const correctPass = await bcrypt.compare(password, user.password);

      if (!correctPass) {
        return { message: "Неверный пароль." };
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );
      user.token = token;
      user.message = "Вы вошли в систему";
      return user;
    } catch (error) {
      return { message: "Ошибка входа" };
    }
  },
  createUser: async ({ input }) => {
    try {
      const {
        email,
        password,
        name,
        lastName,
        phone,
        image,
        favouriteName,
        favouriteApiId,
      } = input;
      const isUsed = await Users.findOne({ where: { email } });
      if (isUsed) {
        return { message: "Такой пользователь уже существует!" };
      }
      const newUser = await Users.create({
        name,
        lastName,
        phone,
        email,
        password: await bcrypt.hash(password, Number(process.env.CRYPT_ROUNDS)),
        role: "user",
        image: image || "",
        favouriteName: favouriteName || "",
        favouriteApiId: favouriteApiId || "",
      });
      const token = jwt.sign(
        {
          id: newUser.id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      await newUser.save();
      newUser.message = "Регистрация успешна!";
      newUser.token = token;
      return newUser;
    } catch (error) {
      return { message: "Ошибка при создании пользователя!" };
    }
  },
};
module.exports = root;
