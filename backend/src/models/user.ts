import mongoose from "mongoose";
import { Role } from "../types/enums/role";

const userSchema = new mongoose.Schema({
    name: {type: String, require:true},
    email: {type: String, require:true, unique: true},
    password: {type: String, require:true, },
    role: {type: String, require:true, enum: Role}
});

const userModel = mongoose.model('User', userSchema);

export default userModel;

