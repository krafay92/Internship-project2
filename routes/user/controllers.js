import UserService from "../../services/user.js";
import httpResponse from "../../utils/httpResponse.js";

const controller = {
  getAll: async (req, res) => {
    try {
      const data = await UserService.getAll();
      return httpResponse.SUCCESS(res, data.data);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER(res, error);
    }
  },

  getById: async (req, res) => {
    try {
      if (req.data.id === req.params.id) {
        const response = await UserService.getById(req.params.id);
        if (response.message === "success") {
          return httpResponse.SUCCESS(res, response.data)
        }

        if (response.message === "failed") {
          return httpResponse.NOT_FOUND(res, response.data)
        }
      }

      return httpResponse.UNAUTHORIZED(res);

    } catch (error) {
      return httpResponse.INTERNAL_SERVER(res, error)
    }
  },

  add: async (req, res) => {
    const addResponse = await UserService.add(req.body);
    if (addResponse.message === "success") {
      return httpResponse.CREATED(res, addResponse.data);
    } else if (addResponse.message === "failed") {
      return httpResponse.CONFLICT(res, addResponse.data);
    } else {
      return httpResponse.INTERNAL_SERVER(res, addResponse.data);
    }
  },

  registration: async (req, res) => {
    const regResponse = await UserService.registration(req.body);

    if (regResponse.message === "success") {
      return httpResponse.CREATED(res, regResponse.data);
    } else if (regResponse.message === "failed") {
      return httpResponse.CONFLICT(res, regResponse.data);
    } else {
      return httpResponse.INTERNAL_SERVER(res, regResponse.data);
    }
  },

  login: async (req, res) => {
    try {
      const response = await UserService.login(req.body);

      if (response.message === "success") {
        return httpResponse.SUCCESS(res, response.data)
      }

      return httpResponse.FORBIDDEN(res, response.message)

    } catch (error) {
      return httpResponse.INTERNAL_SERVER(res, error)
    }

  },

  update: async (req, res) => {
    try {
      if (req.data.id === req.params.id) {
        const response = await UserService.update(req.params.id, req.body);

        if (response.message === "success") {
          return httpResponse.SUCCESS(res, response.data)
        }

        return httpResponse.FORBIDDEN(res, response.message)
      }

      return httpResponse.UNAUTHORIZED(res)
    } catch (error) {
      return httpResponse.INTERNAL_SERVER(res, error)
    }
  },

  delete: async (req, res) => {
    try {
      if (req.data.id === req.params.id) {
        const response = await UserService.delete(req.params.id);

        if (response.message === "success") {
          return httpResponse.SUCCESS(res, response.data)
        }

        return httpResponse.NOT_FOUND(res, response.data)
      }

      return httpResponse.UNAUTHORIZED(res);
    } catch (error) {
      return httpResponse.INTERNAL_SERVER(res, error)
    }
  }
}

export default controller;
