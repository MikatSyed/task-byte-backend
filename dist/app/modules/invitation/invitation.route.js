"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const invitation_controller_1 = require("./invitation.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(), 
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
invitation_controller_1.InvitationController.insertIntoDB);
router.get('/', (0, auth_1.default)(), invitation_controller_1.InvitationController.getAllFromDB);
router.patch('/:id/status', (0, auth_1.default)(), invitation_controller_1.InvitationController.updateInvitationStatus);
// router.get(
//   '/my-profile',
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
//   UserController.getLoggedUser
// )
// router.get('/', UserController.getAllUsers)
// router.patch('/:id', UserController.updateUser)
// router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)
exports.InvitationRoutes = router;
