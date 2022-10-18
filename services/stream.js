import StreamModel from "../models/stream.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const StreamService = {
    getAll: async () => {
        try {
            const data = await StreamModel.find();

            return { message: "success", data };
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    getById: async (id) => {
        try {
            const stream = await StreamModel.findOne({ _id: id });
            if (stream) {
                return { message: "success", data: stream }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    getStreamHistory: async () => {
        try {
            const history = await StreamModel.aggregate([
                {
                    $lookup: {
                        from: "episodes",
                        localField: "episode_id",
                        foreignField: "_id",
                        as: "episode"
                    }
                },
                {
                    $unwind: "$episode"
                },
                {
                    $addFields: {
                        episode_name: "$episode.name"
                    }
                },
                {
                    $project: {
                        episode: 0
                    }
                }
            ])

            if (history) {
                return { message: "success", data: history }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    add: async (body) => {
        try {
            const savedData = await StreamModel.create(body);
            if (savedData) {
                return { message: "success", data: savedData };
            }
        } catch (error) {
            return { message: "error", data: error.message };
        }
    },

    update: async (id, body) => {
        try {
            const update_stream = await StreamModel.findByIdAndUpdate(id, { time: body.time });

            if (update_stream) {
                return { message: "success" }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    delete: async (id) => {
        try {
            const delete_stream = await StreamModel.findByIdAndDelete(id);
            if (delete_stream) {
                return { message: "success" }
            }

            return { message: "error" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    },

    getByTime: async (id) => {
        try {
            const stream = await StreamModel.aggregate([
                {
                    $match: {
                        user_id: ObjectId(id)
                    }
                },
                {
                    $group: {
                        _id: "$episode_id", total_time: { $sum: "$time" }
                    }
                },
                {
                    $group: {
                        _id: null, max_time: { $max: "$total_time" }
                    }
                },
                {
                    $project: {
                        _id: 0
                    }
                }
            ])

            if (stream) {
                return { message: "success", data: stream }
            }

            return { message: "failed" }
        } catch (error) {
            return { message: "error", data: error.message }
        }
    }

}

export default StreamService;