import GenreModel from "../models/genre.js"

const GenreService = {
    getAll: async () => {
        try {
            const data = await GenreModel.find();

            return { message: "success", data };
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    getById: async (id) => {
        try {
            const genre = await GenreModel.findOne({ _id: id });
            if (genre) {
                return { message: "success", data: genre }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    add: async (body) => {
        try {
            const genre = await GenreModel.findOne({name: body.name});
            if(genre) {
                return { message: "failed"}
            }
            const savedData = await GenreModel.create(body);
            if (savedData) {
                return { message: "success", data: savedData };
            }
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    update: async (id, body) => {
        try {
            const check = await GenreModel.findOne({name: body.name});
            if(check) {
                return { message: "failed" }
            }

            const update_genre = await GenreModel.findByIdAndUpdate(id, { name: body.name });
            if (update_genre) {
                return { message: "success" }
            }

            return { message: "failed" }
        } catch (error) {

        }
    },

    delete: async (id) => {
        try {
            const delete_genre = await GenreModel.findByIdAndDelete(id);
            if (delete_genre) {
                return { message: "success" }
            }

            return { message: "error" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    }

}

export default GenreService;