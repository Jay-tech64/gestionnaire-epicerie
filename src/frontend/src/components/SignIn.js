const SignIn = (props) => {
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
            id="username"
            className="form-control"
            type="email"
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
            id="password"
            className="form-control"
            type="password"
            value={props.password}
            onChange={props.changePassword}
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
            value={props.verifyPassword}
            onChange={props.changeVerifyPassword}
            required
          />
        </div>

        <div className="d-flex mb-3">
          {props.isLoading ? (
            <button className="btn btn-info" disabled>
              Loading...
            </button>
          ) : (
            <button className="btn btn-info">S'inscrire</button>
          )}
          <p className="m-2 text-danger fw-bold">{props.errorMessage}</p>
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
