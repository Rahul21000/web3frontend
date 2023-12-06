import "./Cards.css";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import { deleteUser } from "../Reducers/TodoSlice";
import { updateUser } from "../Reducers/TodoSlice";
import { userGroup } from "../Reducers/TodoSlice";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { FormType } from "./AddUser";

const Cards: React.FC<FormType> = ({
  id,
  first_name,
  last_name,
  gender,
  email,
  avatar,
  available,
}) => {
  const dispatch = useAppDispatch();
  const { isSuccess } = useAppSelector((state) => state.app);
  const [open, setOpen] = useState<boolean>(false);
  const [cardstatus, setCardstatus] = useState<boolean>(false);
  const userfield = {
    id,
    first_name,
    last_name,
    gender,
    email,
    avatar,
    available,
  };

  const [input, setInput] = useState<FormType>({
    id: id,
    first_name: first_name,
    last_name: last_name,
    gender: gender,
    email: email,
    avatar: "https://robohash.org/quiautiste.png?size=50x50&set=set1",
    available: false,
  });
  console.log(input);

  const addcard = () => {
    setCardstatus(!cardstatus);
    dispatch(userGroup(userfield));
  };

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(input));
  };

  const handleonchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((pre) =>
      e.target.name === "available"
        ? { ...pre, [e.target.name]: e.target.checked }
        : { ...pre, [e.target.name]: e.target.value }
    );
  };

  return (
    <div>
      <div className="card_div">
        <div className="avtar">
          <img src={avatar} alt="avtar"></img>
        </div>
        <div className="delete-icon">
          <ModeEditIcon className="edit" onClick={() => setOpen(!open)} />
        </div>

        <div className="name">
          Name : {first_name} {last_name}
        </div>
        <div className="gender">Gender : {gender}</div>
        <div className="email">Email : {email}</div>
        <div
          className={cardstatus ? "added_card" : "add_cards"}
          onClick={() => addcard()}
        >
          {cardstatus ? "added" : "add card"}
        </div>
      </div>
      {open ? (
        <div className="update_div">
          <div className="icon">
            <DeleteIcon className="delete" onClick={() => dispatch(deleteUser(id))} />
            <CloseIcon className="close" onClick={() => setOpen(false)} />
          </div>
          {isSuccess ? (
            <div style={{ color: "green", textAlign: "center" }}>
              update User successfully !!
            </div>
          ) : (
            ""
          )}
          <form onSubmit={handlesubmit}>
            First Name
            <input
              type="text"
              name="first_name"
              value={first_name}
              onChange={handleonchange}
            />
            Last Name
            <input
              type="text"
              name="last_name"
              value={last_name}
              onChange={handleonchange}
            />{" "}
            <br />
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleonchange}
            />{" "}
            <br />
            Gender
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={gender === "male"}
              onChange={handleonchange}
            />
            Male
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={gender === "female"}
              onChange={handleonchange}
            />
            Female
            <br />
            Availability
            <input
              type="radio"
              name="available"
              value="true"
              checked={available}
              onChange={handleonchange}
            />{" "}
            yes
            <input
              type="radio"
              name="available"
              value="false"
              checked={available}
              onChange={handleonchange}
            />{" "}
            no
            <div className="button">
              <button type="submit">update</button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cards;
