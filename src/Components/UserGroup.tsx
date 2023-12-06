import "./Cards.css";
import React from "react";
import {useAppDispatch,useAppSelector} from "../Hooks"
import { removeuserGroup } from "../Reducers/TodoSlice";


const Cards:React.FC=()=> {
  const dispatch=useAppDispatch()
  
    const {userGroupData} = useAppSelector(state=>state.app)
    const removecard = (id:number) => {
      dispatch(removeuserGroup(id));
    };
  return (
    <div  style={{margin:"20px 10px",display:"flex",gap:"10px",flexWrap:"wrap"}}>
    {userGroupData.map(user=>
    <div key={user.id} className="card_div">
      <div className="avtar">
        <img src={user.avatar} alt="avtar"></img>
      </div>
      <div className="name">
        Name : {user.first_name} {user.last_name}
      </div>
      <div className="gender">Gender : {user.gender}</div>
      <div className="email">Email : {user.email}</div>
      <div className="add_cards" onClick={() => removecard(user.id)}>Remove</div>
    </div>
    )}
    </div>
  );
}

export default Cards;
