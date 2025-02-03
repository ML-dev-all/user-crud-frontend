import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const UserForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", { name, email, age });
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div>
      <h1>Cadastrar Usuário</h1>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="age" class="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          ></input>
        </div>

        <Button className="btn btn-primary m-2" type="submit">
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
