import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <h4 className="text-center mb-4">Menu</h4>
      <nav className="d-flex flex-column">
        <NavLink to="/" className="nav-link" activeclassname="active">
          📊 Dashboard
        </NavLink>
        <NavLink to="/new" className="nav-link" activeclassname="active">
          ➕ Adicionar Usuário
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
