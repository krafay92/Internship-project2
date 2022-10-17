import EpisodeModel from "../models/episode.js";

const EpisodeService = {
    getAll: async () => {
        try {
            const data = await EpisodeModel.find();

            return { message: "success", data };
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    getById: async (id) => {
        try {
            const episode = await EpisodeModel.findOne({ _id: id });
            if (episode) {
                return { message: "success", data: episode }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    getBySeason: async (id) => {
        try {
            const episode = await EpisodeModel.find({season_id: id});
            if(episode) {
                return { message: "success", data: episode}
            }

            return {message: "failed"}
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    add: async (body) => {
        try {
            const episode = await EpisodeModel.findOne({name: body.name, season_id: body.season_id});
            if(episode) {
                return { message: "failed"}
            }
            const savedData = await EpisodeModel.create(body);
            if (savedData) {
                return { message: "success", data: savedData };
            }
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    update: async (id, body) => {
        try {
            const check = await EpisodeModel.findOne({name: body.name});
            if(check) {
                return { message: "failed" }
            }

            const update_episode = await EpisodeModel.findByIdAndUpdate(id, { name: body.name });

            if (update_episode) {
                return { message: "success" }
            }

            return { message: "failed" }
        } catch (error) {

        }
    },

    delete: async (id) => {
        try {
            const delete_episode = await EpisodeModel.findByIdAndDelete(id);
            if (delete_episode) {
                return { message: "success" }
            }

            return { message: "error" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    }

}

export default EpisodeService;