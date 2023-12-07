import { Request, Response } from "express";
import { Userservice } from "../service/user.service";

const getAllUserHandler = async (req: Request, res: Response) => {
  
  const result= await Userservice.getUsers()
  res.send(result);

};
const getUserHandler = async (req: Request, res: Response) => {
  
  let id:string = req?.params?.id;
  const result= await Userservice.getUser(id)
  
  if(!result){
    res.status(400).send({messege:"user not found and can not be deleted"}); 
  };
  res.status(200).send(result);
};

const createUserHandler = async (req: Request, res: Response) => {
  
  const data = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    avatar: req.body.avatar,
    available: req.body.available,
  };

    const result= await Userservice.createUser(data)
    res.status(200).send(result);
}

const updateUserHandler = async (req: Request, res: Response) => {
  
  const id: string = req?.params?.id;
  const result= await Userservice.updateUser(id,req.body)
  if(!result){
    res.status(400).send({messege:"user not found and can not be deleted"}); 
  };
  res.send(result);
}

const deleteUserHandler = async (req: Request, res: Response) => {
  
  const id: string = req.params.id;
  const result= await Userservice.updateUser(id,req.body)
  res.status(200).send(result);
  
};

export default {
  getAllUserHandler,
  getUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
