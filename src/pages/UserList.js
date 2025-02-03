import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import api from "../services/api"; // Importa as funções da API
import BarChart from "../components/BarChart";
import { Button, Col, Container, Row } from "react-bootstrap";
import ReportGenerator from "../components/ReportGenerator";

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
      <Container>
        <Row className="fs-6 align-items-center">
          <Col md={8} className="table-responsive">
            <table className="table table-hover">
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
                      <Button
                        className="btn btn-primary m-2 btn-sm"
                        onClick={() => navigate(`/edit-user/${user._id}`)}
                      >
                        Editar
                      </Button>
                      {/* Botão para deletar */}
                      <Button
                        className="btn btn-danger m-2 btn-sm"
                        onClick={() => handleDelete(user._id)}
                      >
                        Deletar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ReportGenerator />
          </Col>
          <Col>
            <BarChart />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserList;
