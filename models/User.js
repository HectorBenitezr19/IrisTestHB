import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todos: { type: Map, of: [String] },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
