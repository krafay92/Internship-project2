import mongoose from "mongoose";

const Schema = mongoose.Schema;
const schema = Schema({
    genre_id: { type: String, required: true },
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true },
    trailer: { type: String, required: true }
});

export default mongoose.model("Series", schema);
