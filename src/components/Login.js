import "./Login.css";

const Login = () => {
  return (
    <form>
      <h1>Gestionnaire d'épicerie</h1>
      <label htmlFor="username">Identifiant</label>
      <input type="text" id="username" />
      <label htmlFor="password">Mot de passe</label>
      <input id="password" type="text" />
    </form>
  );
};

export default Login;
