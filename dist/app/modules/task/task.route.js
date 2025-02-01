"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("./task.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const router = express_1.default.Router();
router.get('/user', (0, auth_1.default)(), task_controller_1.TaskController.getAllFromDBForSpecificUser);
router.post('/', (0, auth_1.default)(), 
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
task_controller_1.TaskController.insertIntoDB);
router.get('/organization/:id', task_controller_1.TaskController.getAllFromDBForOrganization);
router.get('/:id', (0, auth_1.default)(), task_controller_1.TaskController.getSingleFromDB);
router.get('/:id', (0, auth_1.default)(), task_controller_1.TaskController.getSingleFromDB);
router.patch('/:id', (0, auth_1.default)(), task_controller_1.TaskController.updateTask);
router.delete('/:id', (0, auth_1.default)(), task_controller_1.TaskController.deleteTask);
exports.TaskRoutes = router;
