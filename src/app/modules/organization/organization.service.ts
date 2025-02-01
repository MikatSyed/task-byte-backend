import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { IOrganization } from "./Organization.interface"
import { Organization } from "./organization.model"
import { IUser } from "../user/user.interface"


const insertIntoDB = async (data: IOrganization,user:any): Promise<IOrganization | null> => {
    
    data.admin = user.userId;
    const createdUser = await Organization.create(data)
    return createdUser
  }

  const getAllFromDB = async (user: any | null) => {
    if (!user || !user.userId) {
      throw new Error("User not authenticated");
    }
  
    console.log("Fetching organizations for admin ID:", user.userId);
  
    // Find organizations where the admin matches the user's ID and populate related fields
    const organizations = await Organization.find({ admin: user.userId })
      .populate("admin", "name")  // Populate admin with name
      .populate("members", "name")  // Populate members with name only
      .exec();  // Ensure we execute the query
  
    console.log(organizations, '26');
  
    // Format the response to only return names inside the members array
    const formattedOrganizations = organizations.map((org) => ({
      ...org.toObject(),
      members: org.members.map((member: any) => member.name), // Extract only names
    }));
  
    console.log(formattedOrganizations, '32');
  
    return formattedOrganizations;
  };

  const getSingleFromDB = async (id: string): Promise<IOrganization | null> => {
    const result = await Organization.findById(id)
      .populate('admin', 'name email') // Populate admin with selected fields
      .populate('members', 'name email'); // Populate members with selected fields
  
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Organization does not exist');
    }
  
    return result;
  };
  
  
  

  export const OrganizationService = {
    insertIntoDB,
    getAllFromDB,
    getSingleFromDB
  }
  