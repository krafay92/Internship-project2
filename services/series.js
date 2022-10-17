import SeriesModel from "../models/series.js"

const SeriesService = {
    getAll: async () => {
        try {
            const data = await SeriesModel.find();

            return { message: "success", data };
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    getById: async (id) => {
        try {
            const series = await SeriesModel.findOne({ _id: id });
            if (series) {
                return { message: "success", data: series }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    getByGenre: async (id) => {
        try {
            const series = await SeriesModel.find({genre_id: id});
            if(series) {
                return { message: "success", data: series}
            }

            return {message: "failed"}
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    add: async (body) => {
        try {
            const series = await SeriesModel.findOne({name: body.name});
            if(series) {
                return { message: "failed"}
            }
            const savedData = await SeriesModel.create(body);
            if (savedData) {
                return { message: "success", data: savedData };
            }
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    update: async (id, body) => {
        try {
            const check = await SeriesModel.findOne({name: body.name});
            if(check) {
                return { message: "failed" }
            }

            const update_series = await SeriesModel.findByIdAndUpdate(id, { name: body.name });

            if (update_series) {
                return { message: "success" }
            }

            return { message: "failed" }
        } catch (error) {

        }
    },

    delete: async (id) => {
        try {
            const delete_series = await SeriesModel.findByIdAndDelete(id);
            if (delete_series) {
                return { message: "success" }
            }

            return { message: "error" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    }

}

export default SeriesService;