import { useState } from "react";
import "../index.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = { username, password };

    setIsLoading(true);

    fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo), // Le id est ajouté automatiquement par JSON Server
    }).then(() => {
      setIsLoading(false);
      history.push("/dashboard");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Gestionnaire d'épicerie</h1>

      <label htmlFor="username">Identifiant</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
        required
      />

      <label htmlFor="password">Mot de passe</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        required
      />

      {isLoading ? (
        <button disabled>Loading...</button>
      ) : (
        <button>Se connecter</button>
      )}
    </form>
  );
};

export default Login;
