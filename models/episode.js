import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = Schema({
    season_id: { type: String, required: true },
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true },
    image: { type: String, required: true}
});

export default mongoose.model("Episode", schema);
