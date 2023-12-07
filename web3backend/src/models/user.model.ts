import { Schema, model } from "mongoose";


//creating an interface
 interface IUser {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  avatar: string,
  available: boolean,
}

//Userschema
const userSchema = new Schema<IUser>({
  id: {
    type: Number,
  },

  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
    required: true,
  },

  

  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
    
  },

  available: {
    type: Boolean,
    required: true,
    default: false,
  },
});

//creating a model
export const User = model<IUser>("User", userSchema);
