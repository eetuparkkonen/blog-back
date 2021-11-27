"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// Userin schema
const schema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
});
// User scheman model
exports.UserModel = mongoose_1.model('User', schema);
