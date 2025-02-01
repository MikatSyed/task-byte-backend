"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const organization_model_1 = require("./organization.model");
const insertIntoDB = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    data.admin = user.userId;
    const createdUser = yield organization_model_1.Organization.create(data);
    return createdUser;
});
const getAllFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user || !user.userId) {
        throw new Error("User not authenticated");
    }
    console.log("Fetching organizations for admin ID:", user.userId);
    // Find organizations where the admin matches the user's ID and populate related fields
    const organizations = yield organization_model_1.Organization.find({ admin: user.userId })
        .populate("admin", "name") // Populate admin with name
        .populate("members", "name") // Populate members with name only
        .exec(); // Ensure we execute the query
    console.log(organizations, '26');
    // Format the response to only return names inside the members array
    const formattedOrganizations = organizations.map((org) => (Object.assign(Object.assign({}, org.toObject()), { members: org.members.map((member) => member.name) })));
    console.log(formattedOrganizations, '32');
    return formattedOrganizations;
});
const getSingleFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield organization_model_1.Organization.findById(id)
        .populate('admin', 'name email') // Populate admin with selected fields
        .populate('members', 'name email'); // Populate members with selected fields
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Organization does not exist');
    }
    return result;
});
exports.OrganizationService = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB
};
