"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
// Blogin schema
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String },
    text: { type: String, required: true },
});
// Blog scheman model
exports.BlogModel = (0, mongoose_1.model)('Blog', schema);
