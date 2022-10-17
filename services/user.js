import UserModel from "../models/user.js"
import jwt from 'jsonwebtoken'

const UserService = {
  getAll: async () => {
    try {
      const data = await UserModel.find();

      return { message: "success", data };
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  getById: async (id) => {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (user) {
        return { message: "success", data: user }
      }

      return { message: "failed" }
    } catch (error) {
      return { message: "error", data: error.message }
    }
  },

  add: async (body) => {
    try {
      const savedData = await UserModel.create(body);
      if (savedData) {
        return { message: "success", data: savedData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  registration: async (body) => {
    try {
      const regData = await UserModel.create(body);
      if (regData) {
        return { message: "success", data: regData };
      }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  login: async (body) => {
    try {
      const loginUser = await UserModel.findOne({ email: body.email, password: body.password });
      if (loginUser) {

        const payload = {
          data: {
            id: loginUser._id,
            name: loginUser.name,
            email: loginUser.email
          }
        }

        const token = jwt.sign(payload, "my_temporary_secret");

        return { message: "success", data: token }
      }

      return { message: 'invalid credentials' }
    } catch (error) {
      return { message: "error", data: error.message };
    }
  },

  update: async (id, body) => {
    try {
      const check = await UserModel.findOne({ first_name: body.first_name, last_name: body.last_name });
      if (check) {
        return { message: "failed" }
      }

      const update_user = await UserModel.findByIdAndUpdate(id, { first_name: body.first_name, last_name: body.last_name })
      if (!update_user) {
        return { message: "error" }
      }

      return { message: "success" }
    } catch (error) {
      return { message: "error", data: error.message }
    }
  },

  delete: async (id) => {
    try {
      const delete_user = await UserModel.findByIdAndDelete(id);
      if (delete_user) {
        return { message: "success" }
      }

      return { message: "error" }
    } catch (error) {
      return { message: "error", data: error.message }
    }
  }
};

export default UserService;
