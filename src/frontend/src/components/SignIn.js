const SignIn = ({
    title,
    changeForm,
    onSubmit,
    email,
    changeEmail,
    password,
    changePassword,
    isLoading,
    errorMessage,
}) => {
    return (
        <div className="divStyles d-flex flex-column justify-content-evenly align-items-center">
            <h1 className="display-1 text-center text-white">{title}</h1>
            <form
                className="d-flex w-50 h-50 flex-column justify-content-center p-5 bg-primary text-white rounded"
                onSubmit={onSubmit}
            >
                <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                        Courriel
                    </label>
                    <input
                        className="form-control"
                        type="email"
                        id="username"
                        value={email}
                        onChange={changeEmail}
                        autoFocus
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
                        onChange={changePassword}
                        required
                    />
                </div>

                <div className="d-flex mb-3">
                    {isLoading ? (
                        <button className="btn btn-info" disabled>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-info">
                            Se connecter
                        </button>
                    )}
                    <p className="m-2 text-danger fw-bold">{errorMessage}</p>
                </div>

                <div className="my-3">
                    <p>Vous n'avez pas de compte?</p>
                    <button className="btn btn-info" onClick={changeForm}>
                        S'inscrire
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
