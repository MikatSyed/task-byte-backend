"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const organization_controller_1 = require("./organization.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(), 
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
organization_controller_1.OrganizationController.insertIntoDB);
router.get('/', (0, auth_1.default)(), organization_controller_1.OrganizationController.getAllFromDB);
router.get('/:id', (0, auth_1.default)(), organization_controller_1.OrganizationController.getSingleFromDB);
// router.get(
//   '/my-profile',
//   auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
//   UserController.getLoggedUser
// )
// router.get('/', UserController.getAllUsers)
// router.patch('/:id', UserController.updateUser)
// router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
// router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)
exports.OrganizationRoutes = router;
