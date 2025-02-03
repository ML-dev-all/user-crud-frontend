import React from "react";
import { signIn, useGoogleAuth } from "../services/GoogleAuth";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const ReportGenerator = () => {
  useGoogleAuth();

  const generateReport = async () => {
    try {
      await signIn();

      const templateId = "1IgldsS0-w4vjNt85s-i8pui6SAudzu4XWPS53g648Ms";
      const users = await axios.get(`${BASE_URL}/users`);

      // 1️⃣ Criação da cópia do documento (template)

      const copyResponse = await window.gapi.client.drive.files.copy({
        fileId: templateId,
        resource: {
          name: `Relatório de Usuários - ${new Date().toLocaleDateString()}`,
        },
      });
      const newDocumentId = copyResponse.result.id; // ID da nova cópia

      // 2️⃣ Substituição dos marcadores no documento copiado
      const requests = users.data.flatMap((user) => [
        {
          replaceAllText: {
            containsText: { text: "{{NOME_DO_USUARIO}}", matchCase: true },
            replaceText: user.name,
          },
        },
        {
          replaceAllText: {
            containsText: { text: "{{EMAIL_DO_USUARIO}}", matchCase: true },
            replaceText: user.email,
          },
        },
      ]);

      await window.gapi.client.docs.documents.batchUpdate({
        documentId: newDocumentId,
        requests,
      });

      alert("Relatório gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert("Ocorreu um erro ao gerar o relatório. Verifique o console.");
    }
  };

  return (
    <div>
      <button onClick={generateReport} className="btn btn-primary">
        Gerar Relatório de Usuários
      </button>
    </div>
  );
};

export default ReportGenerator;
