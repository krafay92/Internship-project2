import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = Schema({
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    episode_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Episode'},
    time: { type: Number, required: true }
});
export default mongoose.model("Stream", schema);