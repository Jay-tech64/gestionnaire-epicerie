import { useState } from "react";

const LogIn = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    console.log("Login");
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
            className="form-control"
            type="email"
            id="username"
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
            className="form-control"
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
          />
        </div>

        <div className="mb-3">
          {isLoading ? (
            <button className="btn btn-info" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit" className="btn btn-info">
              Se connecter
            </button>
          )}
        </div>

        <div className="my-3">
          <p>Vous n'avez pas de compte?</p>
          <button className="btn btn-info" onClick={props.changeForm}>
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
