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
exports.OrganizationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const organization_service_1 = require("./organization.service");
/* @typescript-eslint/no-explicit-any */
const insertIntoDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = __rest(req.body, []);
        const user = req.user;
        const result = yield organization_service_1.OrganizationService.insertIntoDB(data, user);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Organization created successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}));
const getAllFromDB = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const result = yield organization_service_1.OrganizationService.getAllFromDB(user);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Organizations retrived successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
}));
const getSingleFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield organization_service_1.OrganizationService.getSingleFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Organization retrieved successfully!',
        data: result,
    });
}));
// const getAllUsers = catchAsync(async (req: Request, res: Response) => {
//     const result = await OrganizationService.getAllOrganization()
//     sendResponse<IUser[]>(res, {
//       success: true,
//       statusCode: httpStatus.OK,
//       message: 'Users retrieved successfully !',
//       data: result,
//     })
//   })
// const getSingleOrganization = async (id: string): Promise<IOrganization | null> => {
//   const result = await Organization.findById({ _id: id })
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Organization does not exist')
//   }
//   return result
// }
// const updateOrganization = async (
//   id: string,
//   payload: Partial<IOrganization>
// ): Promise<IOrganization | null> => {
//   const isExist = await Organization.findOne({ _id: id })
//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found !')
//   }
//   const { name, ...OrganizationData } = payload
//   const updatedOrganizationData: Partial<IOrganization> = { ...OrganizationData }
//   // dynamically handling
//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach(key => {
//       const nameKey = `name.${key}` as keyof Partial<IOrganization> // `name.fisrtName`
//       ;(updatedOrganizationData as any)[nameKey] = name[key as keyof typeof name]
//     })
//   }
//   const result = await Organization.findOneAndUpdate({ _id: id }, updatedOrganizationData, {
//     new: true,
//   })
//   return result
// }
// const deleteOrganization = async (id: string): Promise<IOrganization | null> => {
//   const result = await Organization.findByIdAndDelete({ _id: id })
//   return result
// }
// const getLoggedOrganization = async (id: JwtPayload): Promise<IOrganization | null> => {
//   const result = await Organization.findById(id, {
//     name: 1,
//     phoneNumber: 1,
//     address: 1,
//     _id: 0,
//   })
//   if (!result) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Organization does not exist')
//   }
//   return result
// }
// const updateLoggedOrganization = async (
//   id: string,
//   payload: Partial<IOrganization>
// ): Promise<IOrganization | null> => {
//   const isExist = await Organization.findOne({ _id: id })
//   if (!isExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found !')
//   }
//   const { name, password, income, budget, ...OrganizationData } = payload
//   const updatedOrganizationData: Partial<IOrganization> = { ...OrganizationData }
//   // dynamically handling
//   if (name && Object.keys(name).length > 0) {
//     Object.keys(name).forEach(key => {
//       const nameKey = `name.${key}` as keyof Partial<IOrganization> // `name.fisrtName`
//       ;(updatedOrganizationData as any)[nameKey] = name[key as keyof typeof name]
//     })
//   }
//   // Hash the password if provided
//   if (password) {
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)
//     updatedOrganizationData.password = hashedPassword
//   }
//   const result = await Organization.findOneAndUpdate({ _id: id }, updatedOrganizationData, {
//     new: true,
//   }).select({ name: 1, phoneNumber: 1, address: 1, _id: 0 })
//   return result
// }
exports.OrganizationController = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB
    //   getAllOrganizations,
    //   getSingleOrganization,
    //   updateOrganization,
    //   deleteOrganization,
    //   getLoggedOrganization,
    //   updateLoggedOrganization,
};
