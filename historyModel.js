import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String, required: true }, // Base64 or URL
  createdAt: { type: Date, default: Date.now }
});

const History = mongoose.model("History", historySchema);
export default History;
