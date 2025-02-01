"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const mongoose_1 = require("mongoose");
const OrganizationSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    admin: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
});
exports.Organization = (0, mongoose_1.model)('Organization', OrganizationSchema);
