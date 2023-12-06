import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import {useAppSelector} from "../Hooks"
const Navbar:React.FC = () => {
  const {userGroupData}=useAppSelector(state=>state.app);
  const user:string="username";
  return (
    <div className="navbar">
      <div className="logo">web3</div>
      <div className='group_div'>
         <div className='group'>
         <Link className="link" to="/">Home</Link>
         </div>
        <div className='group'>
         <Link className="link" to="groups">Group ({userGroupData.length})</Link>
        </div>
        <div className='group'>
         <Link className="link" to="adduser">AddUser</Link>
        </div>
      </div>
      <div className="profile-wrapper">
        <div className="notifiation">
          <img src="/Images/Notification.svg" alt="" />
        </div>
        <div className="profile-logo">
          <img src="/Images/nav-image.svg" alt="" />
          <div className="profile-menu">
            <h3>{user}</h3>
            <hr></hr>
            <div className="profile">Profile</div>
            <div className="setting">Setting</div>
            <div className="about">About</div>
            <div className="logout">
              <img src="Images/logout.png" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
