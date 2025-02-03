import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { Button } from "react-bootstrap";

const EditUser = () => {
  const { id } = useParams(); // Obtém o ID do usuário a partir da URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  // Carregar os dados do usuário ao abrir a página
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`); // Busca o usuário pelo ID
        setFormData({
          name: response.data.name,
          email: response.data.email,
          age: response.data.age,
        });
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Erro ao carregar os dados do usuário.");
      }
    };

    fetchUser();
  }, [id]);

  // Atualiza os valores do formulário no estado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envia os dados atualizados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${id}`, formData); // Atualiza o usuário no backend
      alert("Usuário atualizado com sucesso!");
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      alert("Erro ao atualizar o usuário.");
    }
  };

  return (
    <div>
      <h1>Editar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div id="emailHelp" className="form-text">
            Complete com seu nome.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          ></input>
        </div>

        <Button className="btn btn-primary m-2" type="submit">
          Salvar Alterações
        </Button>
      </form>
      <Button className="btn btn-danger m-2" onClick={() => navigate("/")}>
        Cancelar
      </Button>
    </div>
  );
};

export default EditUser;
