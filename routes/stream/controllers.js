import { response } from "express";
import StreamService from "../../services/stream.js";
import httpResponse from "../../utils/httpResponse.js";

const controller = {
    getAll: async (req, res) => {
        try {
            const data = await StreamService.getAll();
            return httpResponse.SUCCESS(res, data.data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER(res, error);
        }
    },

    getById: async (req, res) => {
        try {
            const response = await StreamService.getById(req.params.id);
            if (response.message === "success") {
                return httpResponse.SUCCESS(res, response.data)
            }

            return httpResponse.NOT_FOUND(res, response.data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER(res, error)
        }
    },

    getStreamHistory: async (req, res) => {
        const response = await StreamService.getStreamHistory();
        if (response.message === "success") {
            return httpResponse.SUCCESS(res, response.data);
        }
        else if (response.message === "failed") {
            return httpResponse.NOT_FOUND(res);
        }
        else if (response.message === "error") {
            return httpResponse.INTERNAL_SERVER(res, response.data)
        }
    },

    add: async (req, res) => {
        const addResponse = await StreamService.add(req.body);
        if (addResponse.message === "success") {
            return httpResponse.CREATED(res, addResponse.data);
        } else if (addResponse.message === "failed") {
            return httpResponse.CONFLICT(res, addResponse.data);
        } else {
            return httpResponse.INTERNAL_SERVER(res, addResponse.data);
        }
    },

    update: async (req, res) => {
        const response = await StreamService.update(req.params.id, req.body);

        if (response.message === "success") {
            return httpResponse.SUCCESS(res)
        }
        else if (response.message === "failed") {
            return httpResponse.NOT_FOUND(res)
        }
        else if (response.message === "error") {
            return httpResponse.INTERNAL_SERVER(res, response.data)
        }
    },

    delete: async (req, res) => {
        const response = await StreamService.delete(req.params.id);
        if (response.message === "success") {
            return httpResponse.SUCCESS(res)
        }
        else if (response.message === "failed") {
            return httpResponse.NOT_FOUND(res);
        }
        else if (response.message === "error") {
            return httpResponse.INTERNAL_SERVER(res, response.data)
        }
    }
}

export default controller;
