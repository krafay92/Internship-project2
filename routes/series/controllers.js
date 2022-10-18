import SeriesService from "../../services/series.js";
import httpResponse from "../../utils/httpResponse.js";

const controller = {
    getAll: async (req, res) => {
        const data = await SeriesService.getAll();
        if (data.message === "success") {
            return httpResponse.SUCCESS(res, data.data);
        }
        else if (data.message === "failed") {
            return httpResponse.NOT_FOUND(res);
        }
        else if (data.message === "error") {
            return httpResponse.INTERNAL_SERVER(res, error);
        }
    },

    getById: async (req, res) => {
        const response = await SeriesService.getById(req.params.id);
        if (response.message === "success") {
            return httpResponse.SUCCESS(res, response.data)
        }
        else if (response.message === "failed") {
            return httpResponse.NOT_FOUND(res, response.data);
        }
        else if (response.message === "error") {
            return httpResponse.INTERNAL_SERVER(res, error)
        }
    },

    getByGenre: async (req, res) => {
        const response = await SeriesService.getByGenre(req.params.id);
        if (response.message === "success") {
            return httpResponse.SUCCESS(res, response.data);
        }
        else if (response.message === "failed") {
            return httpResponse.NOT_FOUND(res);
        }
        else if (response.message === "error") {
            return httpResponse.INTERNAL_SERVER(res, error)
        }
    },

    add: async (req, res) => {
        const addResponse = await SeriesService.add(req.body);
        if (addResponse.message === "success") {
            return httpResponse.CREATED(res, addResponse.data);
        } else if (addResponse.message === "failed") {
            return httpResponse.CONFLICT(res, addResponse.data);
        } else {
            return httpResponse.INTERNAL_SERVER(res, addResponse.data);
        }
    },

    update: async (req, res) => {
        const response = await SeriesService.update(req.params.id, req.body);

        if (response.message === "success") {
            return httpResponse.SUCCESS(res)
        }
        else if (response.message === "failed") {
            return httpResponse.FORBIDDEN(res)
        }
        else if (response.message === "error") {
            httpResponse.INTERNAL_SERVER(res, response.data)
        }
    },

    delete: async (req, res) => {
        const response = await SeriesService.delete(req.params.id);
        if (response.message === "success") {
            return httpResponse.SUCCESS(res, response.data)
        }
        else if (response.message === "failed") {
            return httpResponse.NOT_FOUND(res, response.data)
        }
        else if (response.message === "error") {
            return httpResponse.INTERNAL_SERVER(res, error)
        }
    }
}

export default controller;
