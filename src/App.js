import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import EditUser from "./pages/EditUser";

const App = () => {
  const [users, setUsers] = useState([]); // Estado global para a lista de usuários

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<UserList users={users} setUsers={setUsers} />}
        />
        <Route path="/new" element={<UserForm />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default App;
