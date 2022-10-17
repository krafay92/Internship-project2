import GenreService from "../../services/genre.js";
import httpResponse from "../../utils/httpResponse.js";

const controller = {
    getAll: async (req, res) => {
        try {
            const data = await GenreService.getAll();
            return httpResponse.SUCCESS(res, data.data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER(res, error);
        }
    },

    getById: async (req, res) => {
        try {
            const response = await GenreService.getById(req.params.id);
            if (response.message === "success") {
                return httpResponse.SUCCESS(res, response.data)
            }

            return httpResponse.NOT_FOUND(res, response.data);
        }

        catch (error) {
            return httpResponse.INTERNAL_SERVER(res, error)
        }
    },

    add: async (req, res) => {
        const addResponse = await GenreService.add(req.body);
        if (addResponse.message === "success") {
            return httpResponse.CREATED(res, addResponse.data);
        } else if (addResponse.message === "failed") {
            return httpResponse.CONFLICT(res, addResponse.data);
        } else {
            return httpResponse.INTERNAL_SERVER(res, addResponse.data);
        }
    },

    update: async (req, res) => {
        try {
            // if (req.data.id === req.body.user_id) {
            const response = await GenreService.update(req.params.id, req.body);

            if (response.message === "success") {
                return httpResponse.SUCCESS(res, response.data);
            }
            return httpResponse.FORBIDDEN(res, response.message);

            // }

            // return httpResponse.UNAUTHORIZED(res)
        } catch (error) {
            return httpResponse.INTERNAL_SERVER(res, error)
        }
    },

    delete: async (req, res) => {
        try {
            // if (req.data.id === req.body.user_id) {
            const response = await GenreService.delete(req.params.id);
            if (response.message === "success") {
                return httpResponse.SUCCESS(res, response.data)
            }

            return httpResponse.NOT_FOUND(res, response.data)
            // }

            // return httpResponse.UNAUTHORIZED(res)
        } catch (error) {
            return httpResponse.INTERNAL_SERVER(res, error)
        }
    }
}

export default controller;
