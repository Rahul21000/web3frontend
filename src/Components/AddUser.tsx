import React, { useState } from "react";
import "./AddUser.css";
import { createUser } from "../Reducers/TodoSlice";
import { useAppDispatch,useAppSelector } from "../Hooks";

export interface FormType {
  id: number;
  first_name: string;
  last_name: string;
  gender?: string;
  email: string;
  avatar?: string;
  available?: boolean;
}

const AddUser: React.FC = () => {
  const {users,isSuccess}=useAppSelector(state=>state.app)
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<FormType>({
    id: users.length+1,
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    avatar: "https://robohash.org/quiautiste.png?size=50x50&set=set1",
    available: false,
  });
  
  const handleonchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((pre) =>
      e.target.name === "available"
        ? { ...pre, [e.target.name]: e.target.checked } 
        : { ...pre, [e.target.name]: e.target.value }
    );
  };
  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createUser(input));
    setInput({
      id: 0,
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      avatar: "https://robohash.org/quiautiste.png?size=50x50&set=set1",
      available: false,
    });
   
  };
 
  return (
    <div className="adduser_div">
      {isSuccess? <div style={{color:"green"}}>created User successfully</div>:""}
      <form onSubmit={handlesubmit}>
        First Name
        <input type="text"  name="first_name" value={input.first_name} onChange={handleonchange} />
        Last Name
        <input type="text" name="last_name" value={input.last_name} onChange={handleonchange} /> <br />
        Email
        <input type="email" name="email" value={input.email} onChange={handleonchange} /> <br />
        Gender
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={handleonchange}
        />
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={handleonchange}
        />
        Female
        <br />
        Availability
        <input
          type="radio"
          name="available"
          value="true"
          checked={input.available}
          onChange={handleonchange}
        />{" "}
        yes
        <input
          type="radio"
          name="available"
          value="false"
          checked={!input.available}
          onChange={handleonchange}
        />{" "}
        no
        <div className="button">
          <button type="reset">Reset</button>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};
export default AddUser;
