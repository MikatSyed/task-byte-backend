"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validate_1 = require("./auth.validate");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validate_1.AuthValidation.loginZodSchema), auth_controller_1.AuthController.loginUser);
router.post('/signup', (0, validateRequest_1.default)(auth_validate_1.AuthValidation.registerUserZodSchema), auth_controller_1.AuthController.createUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validate_1.AuthValidation.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
exports.AuthRoute = router;
