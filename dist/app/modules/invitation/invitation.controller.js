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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const invitation_service_1 = require("./invitation.service");
/* @typescript-eslint/no-explicit-any */
const insertIntoDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = __rest(req.body, []);
        const result = yield invitation_service_1.InvitationService.insertIntoDB(data);
        // Type check to handle ApiError
        if (Array.isArray(result)) {
            (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Invitation created successfully!',
                data: result,
            });
        }
        else {
            // If result is an ApiError, handle it (you can customize this based on your logic)
            next(result); // Assuming 'result' is an instance of ApiError
        }
    }
    catch (err) {
        next(err);
    }
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const result = yield invitation_service_1.InvitationService.getAllFromDB(user);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Invitation retrived successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}));
const updateInvitationStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { status } = req.body;
    console.log(req.body, '44');
    // Validate status value
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
        return res.status(http_status_1.default.BAD_REQUEST).json({
            success: false,
            message: 'Invalid status value. Allowed values: pending, accepted, rejected',
        });
    }
    const result = yield invitation_service_1.InvitationService.updateInvitationStatus(id, status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Invitation status updated successfully!',
        data: result,
    });
}));
exports.InvitationController = {
    insertIntoDB,
    getAllFromDB,
    updateInvitationStatus
};
