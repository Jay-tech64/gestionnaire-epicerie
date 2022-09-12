import { useState } from "react";

const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    console.log("Login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{props.title}</h1>

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
      <p>Vous n'avez pas de compte?</p>
      <button onClick={props.changeForm}>S'inscrire</button>
    </form>
  );
};

export default LogIn;
