import httpStatus from "http-status";
import { IInvitation } from "./invitation.interface";
import Invitation from "./invitation.model";
import ApiError from "../../../errors/ApiError";


const insertIntoDB = async (data: Omit<IInvitation, "user"> & { user: string[] }): Promise<IInvitation[] | ApiError> => {
   
    const operations:any = [];
  
  
    for (const userId of data.user) {
      
      operations.push({
        updateOne: {
          filter: { organization: data.organization, user: userId },
          update: { $setOnInsert: { organization: data.organization, user: userId, status: data.status || "pending" } },
          upsert: true,  
        }
      });
    }
  
   
    const result = await Invitation.bulkWrite(operations);
  
   
    if (result.upsertedCount === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Already Sent Invitations");
    }
  
    
    const createdInvitations = await Invitation.find({
      organization: data.organization,
      user: { $in: data.user },
    });
  
    return createdInvitations;
  };
  
  
  const getAllFromDB = async (user: any | null) => {
   
    
    const invitations = await Invitation.find({ user: user.userId })
      .populate("organization", "name") 
      .populate("user", "name") 
      .exec();

    console.log(invitations, "Fetched Invitations");

  
    const formattedInvitations = invitations.map((invitation:any) => ({
      _id: invitation._id, // Return Invitation ID
      organizationName: invitation.organization?.name, 
      organizationId: invitation.organization?._id, 
      invitedUser: invitation.user?.name, 
      status: invitation.status, 
      createdAt: invitation.createdAt, 
    }));
    console.log(formattedInvitations,'60')
  
    return formattedInvitations;
  };
  

  
  const updateInvitationStatus = async (
    id: string,
    status: 'pending' | 'accepted' | 'rejected'
  ): Promise<IInvitation | null> => {
    // Check if the invitation exists
    const existingInvitation = await Invitation.findById(id)
      .populate('organization') // Populate the organization to get its details
      .populate('user'); // Populate the user to get user details
  
    if (!existingInvitation) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Invitation not found!');
    }
  
    // Update only the status field
    existingInvitation.status = status;
    await existingInvitation.save();
  
    // If status is accepted, update the organization members
    if (status === 'accepted') {
      const organization:any = existingInvitation.organization;
  
      // Check if the organization exists
      if (!organization) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found!');
      }
  
      // Push the user into the organization's members array
      organization.members.push(existingInvitation.user);
  
      // Save the updated organization
      await organization.save();
    }
  
    return existingInvitation;
  };
  
  
  

  export const InvitationService = {
    insertIntoDB,
    getAllFromDB,
    updateInvitationStatus
  }
  