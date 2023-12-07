import {User} from "../models/user.model";

class userservice{

  getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } 
  catch (error: any) {
    return error;
  }
};

  getUser = async (id:string) => {
  try {
    const user = await User.findOne({ id: id });
    return user;
  } 
  catch (error: any) {
    return error;
  }
};

  createUser = async (data:any) => {
  try {
    // const newUser = new User(data);
    // const result = await newUser.save();
       const newUser=await User.create(data)
    return newUser;
  } 
  catch (error: any) {
    return error;
  }
};

  updateUser = async (id:string,data:any) => {
  try {
    const userz = await User.findOneAndUpdate({ id: id }, data);
    return userz;
  } 
  catch (error: any) {
    return error;
  }
};

  deleteUser = async (id:string) => {
  try {
    let post = await User.findOneAndDelete({ id: id });
    return post;
  } 
  catch (error: any) {
    return error;
  }
};

}

export const Userservice=new userservice()
