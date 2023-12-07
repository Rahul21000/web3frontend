import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from '../../src/Store'
import {FormType} from '../Components/AddUser';
import { log } from "console";

interface User{
  id:number;
  first_name:string;
  last_name:string;
  gender:string;
  email:string;
  avatar:string;
  available?:boolean;
}

interface InitialState{
  users:  User[];
  searchData:  string[];
  userGroupData:  User[];
  isLoading:boolean;
  isSuccess:boolean;
  isError:boolean;
}
const initialState:InitialState={
  users: [],
   searchData:[],
   userGroupData:[],
   isLoading:false,
   isSuccess:false,
  isError:false,
}

export const readUser=createAsyncThunk("readUser",async()=>{
  const response=await fetch('http://localhost:5000/api/user');
  try{
    const result =await response.json();
    return result;
  }
  catch(error){
    return error;
  }

})

export const createUser=createAsyncThunk("createUser",async(data:FormType)=>{
const response=await fetch('http://localhost:5000/api/user',{
method:"POST",
headers:{"content-type":"application/json"},
body:JSON.stringify(data)
});
try{
  const result=await response.json();
  return result;
}
catch(error){
  return error;
}
})

export const updateUser:any=createAsyncThunk("updateUser",async(data:FormType)=>{
  console.log("updatedata",data);
  
  const response=await fetch(`http://localhost:5000//api/user/${data.id}`,{
  method:"PUT",
  headers:{"content-type":"application/json"},
  body:JSON.stringify(data)
  });
  try{
    const result=await response.json();
    return result;
  }
  catch(error){
    return error;
  }
  })

  export const deleteUser=createAsyncThunk("deleteUser",async(id:number)=>{
    const response=await fetch(`http://localhost:5000/api/user/${id}`,{
    method:"DELETE",
    });
    try{
      const result=await response.json();
      return result;
    }
    catch(error){
      return error;
    }
    })
  
    
    



const todoSlice = createSlice({
  name: "userTodo",
  initialState,
  reducers:{
    searchUser:(state,action)=>{
     state.searchData=action.payload;
    },
    userGroup:(state,action)=>{
      state.userGroupData.push(action.payload);
     },
     removeuserGroup:(state,action)=>{
      state.userGroupData= state.userGroupData.filter(ele=>ele.id!==action.payload);
     },
  },
    extraReducers:(builder)=>{
      builder.addCase(readUser.pending,(state)=>{
        state.isLoading=true;
      });
      builder.addCase(readUser.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.users=action.payload;
      });
      builder.addCase(readUser.rejected,(state)=>{
        state.isError=true;
      });
      builder.addCase(createUser.pending,(state)=>{
        state.isLoading=true;
      });
      builder.addCase(createUser.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        state.users.push(action.payload);
      });
      builder.addCase(createUser.rejected,(state)=>{
        state.isError=true;
        state.isSuccess=false;
      });
      builder.addCase(updateUser.pending,(state)=>{
        state.isLoading=false;
      });
      builder.addCase(updateUser.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.isSuccess=true;
        let findUser=state.users.filter(data=>(data.id===action.payload.id
          ));
          if(findUser){
            findUser=action.payload;
            state.users=findUser;
          }

      });
      builder.addCase(updateUser.rejected,(state)=>{
        state.isError=true;
      });
      builder.addCase(deleteUser.pending,(state)=>{
        state.isLoading=false;
      });
      builder.addCase(deleteUser.fulfilled,(state,action)=>{
        console.log(action.payload);
        state.isLoading=false;
        state.isSuccess=true;
        state.users=state.users.filter(data=>data.id!==action.payload.id);
      });
      builder.addCase(deleteUser.rejected,(state)=>{
        state.isError=true;
      });
    },
     
});

export default todoSlice.reducer;
export const {searchUser,userGroup,removeuserGroup}=todoSlice.actions;
