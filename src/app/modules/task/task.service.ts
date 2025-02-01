import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { ITask } from "./task.interface"
import { Task } from "./task.model"
import { IUser } from "../user/user.interface"


const insertIntoDB = async (data: ITask,user:any): Promise<ITask | null> => {
    
    const createdTask = await Task.create(data)
    return createdTask;
  }

  const getAllFromDBForOrganization = async (id: string | null) => {
   
    // Find Tasks where the admin matches the user's ID and populate related fields
    const Tasks = await Task.find({ organization: id })
      .populate("assignedTo", "name")  // Populate admin with name
      .populate("organization", "name")  // Populate members with name only
      .exec();  // Ensure we execute the query
  
    console.log(Tasks, '26');
  

    return Tasks;
  };
  const getAllFromDBForSpecificUser = async (user: any | null) => {
   console.log(user,'28')

    const Tasks = await Task.find({ assignedTo: user.userId })
    .populate("assignedTo", "name")  
    .populate("organization", "name")  
    .exec();  
  
    return Tasks;
  };

  const getSingleFromDB = async (id: string): Promise<ITask | null> => {
    const result = await Task.findById(id).populate({
        path: "assignedTo",
        select: "name", 
    });

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Task does not exist');
    }

    return result;
};

const updateTask = async (
    id: string,
    payload: Partial<ITask>
  ): Promise<ITask | null> => {
    console.log(id,payload,'55')
    const isExist = await Task.findOne({ _id: id })
  
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found !')
    }
  
    const { ...data } = payload
  
    const result = await Task.findOneAndUpdate({ _id: id }, data, {
      new: true,
    })
  
    return result
  }
  
  const deleteTask = async (id: string): Promise<ITask | null> => {
    const result = await Task.findByIdAndDelete({ _id: id })
    return result
  }
  
  

  export const TaskService = {
    insertIntoDB,
    getAllFromDBForOrganization,
    getAllFromDBForSpecificUser,
    getSingleFromDB,
    updateTask,
    deleteTask
  }
  