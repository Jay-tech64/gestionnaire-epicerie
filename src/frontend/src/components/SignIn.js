import { useState } from "react";
import "../index.css";
import { useHistory } from "react-router-dom";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      alert("Le mot de passe n'est pas le même");
      return;
    }
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
    <div className="divStyles d-flex flex-column justify-content-evenly align-items-center">
      <h1 className="display-1 text-center text-white">{props.title}</h1>
      <form
        className="d-flex w-50 h-50 flex-column justify-content-center p-5 bg-primary text-white rounded"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Courriel
          </label>
          <input
            id="username"
            className="form-control"
            type="email"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            id="password"
            className="form-control"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="verifyPassword">
            Vérifier votre mot de passe
          </label>
          <input
            id="verifyPassword"
            className="form-control"
            type="password"
            value={verifyPassword}
            onChange={({ target }) => setVerifyPassword(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          {isLoading ? (
            <button className="btn btn-info" disabled>
              Loading...
            </button>
          ) : (
            <button className="btn btn-info">S'inscrire</button>
          )}
        </div>

        <div className="mb-3">
          <p>Vous avez déjà un compte?</p>
          <button className="btn btn-info" onClick={props.changeForm}>
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;