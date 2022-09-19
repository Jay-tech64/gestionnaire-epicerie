const LogIn = (props) => {
 
  return (
    <div className="divStyles d-flex flex-column justify-content-evenly align-items-center">
      <h1 className="display-1 text-center text-white">{props.title}</h1>
      <form
        className="d-flex w-50 h-50 flex-column justify-content-center p-5 bg-primary text-white rounded"
        onSubmit={props.onSubmit}
      >
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Courriel
          </label>
          <input
            className="form-control"
            type="email"
            id="username"
            value={props.email}
            onChange={props.changeEmail}
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
            value={props.password}
            onChange={props.changePassword}
            required
          />
        </div>

        <div className="d-flex mb-3">
          {props.isLoading ? (
            <button className="btn btn-info" disabled>
              Loading...
            </button>
          ) : (
            <button type="submit" className="btn btn-info">
              Se connecter
            </button>
          )}
          <p className="m-2 text-danger fw-bold">{props.errorMessage}</p>
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
