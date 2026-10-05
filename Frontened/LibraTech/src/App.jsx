import "./App.css";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/signUp";
import Login from "./Pages/Login";
// import Dashboard from "./Pages/Dashboard";
import Books from "./Pages/Admin/AdminBooks.jsx";
import AdminSidebar from "./Pages/Admin/AdminSidebar.jsx";
import AdminBooks from "./Pages/Admin/AdminBooks.jsx";
import AdminDashboard from "./Pages/Admin/AdminHome.jsx";
import AdminMembers from "./Pages/Admin/AdminMember.jsx";
import UserDashboard from "./Pages/User/userDashboard.jsx";
import UserSidebar from "./Pages/User/UserSidebar.jsx";
import UserAllBooks from "./Pages/User/UserAllBooks.jsx";
import UserBooks from "./Pages/User/UserBooks.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
        <Route path="/books" element={<Books />}></Route>
        <Route path="/admin" element={<AdminSidebar />}>
          <Route index element={<AdminDashboard />} />

          <Route path="books" element={<AdminBooks />} />

          <Route path="members" element={<AdminMembers />} />
        </Route>
          <Route path="/user" element={<UserSidebar />}>
          <Route index element={<UserDashboard />} />

          <Route path="allbooks" element={<UserAllBooks />} />

          <Route path="my-books" element={<UserBooks />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
