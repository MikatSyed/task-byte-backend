"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const organization_route_1 = require("../modules/organization/organization.route");
const invitation_route_1 = require("../modules/invitation/invitation.route");
const task_route_1 = require("../modules/task/task.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoute,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/organization',
        route: organization_route_1.OrganizationRoutes,
    },
    {
        path: '/invitation',
        route: invitation_route_1.InvitationRoutes,
    },
    {
        path: '/task',
        route: task_route_1.TaskRoutes,
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
