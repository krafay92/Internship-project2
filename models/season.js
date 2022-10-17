import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;
const schema = Schema({
    series_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Series' },
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true }
});

export default mongoose.model("Season", schema);
