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
exports.InvitationService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const invitation_model_1 = __importDefault(require("./invitation.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const operations = [];
    for (const userId of data.user) {
        operations.push({
            updateOne: {
                filter: { organization: data.organization, user: userId },
                update: { $setOnInsert: { organization: data.organization, user: userId, status: data.status || "pending" } },
                upsert: true,
            }
        });
    }
    const result = yield invitation_model_1.default.bulkWrite(operations);
    if (result.upsertedCount === 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Already Sent Invitations");
    }
    const createdInvitations = yield invitation_model_1.default.find({
        organization: data.organization,
        user: { $in: data.user },
    });
    return createdInvitations;
});
const getAllFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const invitations = yield invitation_model_1.default.find({ user: user.userId })
        .populate("organization", "name")
        .populate("user", "name")
        .exec();
    console.log(invitations, "Fetched Invitations");
    const formattedInvitations = invitations.map((invitation) => {
        var _a, _b, _c;
        return ({
            _id: invitation._id,
            organizationName: (_a = invitation.organization) === null || _a === void 0 ? void 0 : _a.name,
            organizationId: (_b = invitation.organization) === null || _b === void 0 ? void 0 : _b._id,
            invitedUser: (_c = invitation.user) === null || _c === void 0 ? void 0 : _c.name,
            status: invitation.status,
            createdAt: invitation.createdAt,
        });
    });
    console.log(formattedInvitations, '60');
    return formattedInvitations;
});
const updateInvitationStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the invitation exists
    const existingInvitation = yield invitation_model_1.default.findById(id)
        .populate('organization') // Populate the organization to get its details
        .populate('user'); // Populate the user to get user details
    if (!existingInvitation) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Invitation not found!');
    }
    // Update only the status field
    existingInvitation.status = status;
    yield existingInvitation.save();
    // If status is accepted, update the organization members
    if (status === 'accepted') {
        const organization = existingInvitation.organization;
        // Check if the organization exists
        if (!organization) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Organization not found!');
        }
        // Push the user into the organization's members array
        organization.members.push(existingInvitation.user);
        // Save the updated organization
        yield organization.save();
    }
    return existingInvitation;
});
exports.InvitationService = {
    insertIntoDB,
    getAllFromDB,
    updateInvitationStatus
};
