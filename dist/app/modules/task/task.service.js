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
exports.TaskService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const task_model_1 = require("./task.model");
const insertIntoDB = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdTask = yield task_model_1.Task.create(data);
    return createdTask;
});
const getAllFromDBForOrganization = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Find Tasks where the admin matches the user's ID and populate related fields
    const Tasks = yield task_model_1.Task.find({ organization: id })
        .populate("assignedTo", "name") // Populate admin with name
        .populate("organization", "name") // Populate members with name only
        .exec(); // Ensure we execute the query
    console.log(Tasks, '26');
    return Tasks;
});
const getAllFromDBForSpecificUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user, '28');
    const Tasks = yield task_model_1.Task.find({ assignedTo: user.userId })
        .populate("assignedTo", "name")
        .populate("organization", "name")
        .exec();
    return Tasks;
});
const getSingleFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.findById(id).populate({
        path: "assignedTo",
        select: "name",
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Task does not exist');
    }
    return result;
});
const updateTask = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload, '55');
    const isExist = yield task_model_1.Task.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    }
    const data = __rest(payload, []);
    const result = yield task_model_1.Task.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield task_model_1.Task.findByIdAndDelete({ _id: id });
    return result;
});
exports.TaskService = {
    insertIntoDB,
    getAllFromDBForOrganization,
    getAllFromDBForSpecificUser,
    getSingleFromDB,
    updateTask,
    deleteTask
};
