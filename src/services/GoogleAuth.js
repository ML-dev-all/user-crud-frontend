import { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = process.env.REACT_APP_ID_CLIENTE_API_REPORT; // Variável do .env
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SCOPES =
  "https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/drive";

export const useGoogleAuth = () => {
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: [
          "https://docs.googleapis.com/$discovery/rest?version=v1",
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", // Adicionado para o Google Drive
        ],
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);
};

export const signIn = () => {
  const auth = gapi.auth2.getAuthInstance();
  return auth.signIn();
};

export const signOut = () => {
  const auth = gapi.auth2.getAuthInstance();
  return auth.signOut();
};
