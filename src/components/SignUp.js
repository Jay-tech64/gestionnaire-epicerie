const SignUp = ({
    title,
    changeForm,
    onSubmit,
    name,
    changeName,
    email,
    changeEmail,
    password,
    changePassword,
    verifyPassword,
    changeVerifyPassword,
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
                    <label className="form-label" htmlFor="name">
                        Nom
                    </label>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={changeName}
                        autoFocus
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                        Courriel
                    </label>
                    <input
                        id="email"
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={changeEmail}
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
                        onChange={changePassword}
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
                        onChange={changeVerifyPassword}
                        required
                    />
                </div>

                <div className="d-flex mb-3">
                    {isLoading ? (
                        <button className="btn btn-info" disabled>
                            Loading...
                        </button>
                    ) : (
                        <button className="btn btn-info">S'inscrire</button>
                    )}
                    <p className="m-2 text-danger fw-bold">{errorMessage}</p>
                </div>

                <div className="mb-3">
                    <p>Vous avez déjà un compte?</p>
                    <button className="btn btn-info" onClick={changeForm}>
                        Se connecter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
