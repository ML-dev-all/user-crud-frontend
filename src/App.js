import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import EditUser from "./pages/EditUser";
import Sidebar from "./components/SideBar";
import { Card } from "react-bootstrap";
import ReportGenerator from "./components/ReportGenerator";

const App = () => {
  const [users, setUsers] = useState([]); // Estado global para a lista de usuários

  return (
    <Router>
      <div className="app-container d-flex vh-100 p-4">
        <Card className="sidebar-container shadow-sm p-4">
          <Sidebar />
        </Card>
        <div className="content-container flex-grow-1">
          <Card className="shadow-sm p-4 h-100">
            <Routes>
              <Route
                path="/"
                element={<UserList users={users} setUsers={setUsers} />}
              />
              <Route path="/new" element={<UserForm />} />
              <Route path="/edit-user/:id" element={<EditUser />} />
              <Route path="/report" element={<ReportGenerator />} />
            </Routes>
          </Card>
        </div>
      </div>
    </Router>
  );
};

export default App;
