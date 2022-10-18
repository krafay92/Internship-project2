import SeasonModel from "../models/season.js"

const SeasonService = {
    getAll: async () => {
        try {
            const data = await SeasonModel.find();

            return { message: "success", data };
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    getById: async (id) => {
        try {
            const season = await SeasonModel.findOne({ _id: id });
            if (season) {
                return { message: "success", data: season }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    getBySeries: async (id) => {
        try {
            const season = await SeasonModel.find({series_id: id});
            if(season) {
                return { message: "success", data: season}
            }

            return {message: "failed"}
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    add: async (body) => {
        try {
            const season = await SeasonModel.findOne({name: body.name, series_id: body.series_id});
            if(season) {
                return { message: "failed"}
            }
            const savedData = await SeasonModel.create(body);
            if (savedData) {
                return { message: "success", data: savedData };
            }
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    update: async (id, body) => {
        try {
            const check = await SeasonModel.findOne({name: body.name});
            if(check) {
                return { message: "failed" }
            }

            const update_season = await SeasonModel.findByIdAndUpdate(id, { name: body.name });

            if (update_season) {
                return { message: "success" }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message}
        }
    },

    delete: async (id) => {
        try {
            const delete_season = await SeasonModel.findByIdAndDelete(id);
            if (delete_season) {
                return { message: "success" }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    }

}

export default SeasonService;