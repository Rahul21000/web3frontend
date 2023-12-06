import React, { useEffect, useState } from "react";
import "./Users.css";
import Cards from "./Cards";
import { searchUser } from "../Reducers/TodoSlice";
import { readUser } from "../Reducers/TodoSlice";
import {useAppDispatch,useAppSelector} from "../Hooks"
function Users() {
  const { users, isLoading, searchData } = useAppSelector((state) => state.app);
  const [search, setSearch] = useState<string|boolean|number>("");
  const [filter, setFilter] = useState<string|boolean>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(searchUser(search));
  }, [search]);
  useEffect(() => {
    dispatch(readUser());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber:any) => {
    if(pageNumber<=0){
      let initialpage=1;
      setCurrentPage(initialpage);
    }
    else if(pageNumber>=totalPages){
      let lastpage=totalPages;
      setCurrentPage(lastpage);
    }
    else{
      setCurrentPage(pageNumber);

    }
  };




  if (isLoading) {
    return <div className="loading">...Loading</div>;
  }

  return (
    <div className="container">
      <h1 className="heading">User Information</h1>
      <div className="search-box">
        <input
          type="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button type="submit">search</button>
      </div>

      <div className="filters">
        <input type="radio" value=" " checked={filter===""} onChange={(e)=>setFilter(e.target.value)}/> All
        <input type="radio" value="Male" checked={filter==="Male"} onChange={(e)=>setFilter(e.target.value)}/> Male
        <input type="radio" value="Female" checked={filter==="Female"} onChange={(e)=>setFilter(e.target.value)}/> Female
        <input type="radio" value="Available" checked={filter==="Available"} onChange={(e)=>setFilter(e.target.value)}/> Available
      </div>
        
        

      <div className="cards">
        {currentUsers &&
          currentUsers
            .filter((user) => {
              if (searchData.length === 0) {
                return user;
              } else {
                return user.first_name
                  .toLowerCase()
                  .includes(searchData[0 ].toLowerCase());
              }
            }).filter((user)=>{
              if(filter==="Male"){
                return user.gender===filter;
              }
              else if(filter==="Female"){
                return user.gender===filter;
              }
              else if(filter==="Available"){
                return user.available===true;
              }
              else{
                return user;
              }
            })
            .map((user) => (
              <Cards
                key={user.id}
                id={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                gender={user.gender}
                email={user.email}
                avatar={user.avatar}
              />
            ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)}>previous</button>
        <button >{currentPage}</button>
        <button onClick={() => handlePageChange(currentPage + 1)}>next</button>
      </div>

    </div>
  );
}
export default Users;
