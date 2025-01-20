import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import api from "../services/api"; // Importa as funções da API
import BarChart from "../components/BarChart";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Busca os usuários no backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users"); // Rota para listar usuários
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  // Função para deletar um usuário
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await api.delete(`/users/${id}`); // Chama a API para deletar o usuário
        setUsers(users.filter((user) => user._id !== id)); // Atualiza a lista localmente
        alert("Usuário deletado com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        alert("Erro ao deletar o usuário.");
      }
    }
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <BarChart />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {/* Botão para editar */}
                <button onClick={() => navigate(`/edit-user/${user._id}`)}>
                  Editar
                </button>
                {/* Botão para deletar */}
                <button onClick={() => handleDelete(user._id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
