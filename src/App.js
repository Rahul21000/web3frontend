import "./App.css";
import Users from "./Components/Users";
import Navbar from "./Components/Navbar";
import UserGroup from "./Components/UserGroup";
import AddUser from "./Components/AddUser";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Users />} />
          <Route exact path="groups" element={<UserGroup />} />
          <Route exact path="adduser" element={<AddUser />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;
