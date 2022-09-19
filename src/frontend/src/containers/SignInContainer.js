import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SignIn from "../components/SignIn";

const SignInContainer = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setErrorMessage("Le mot de passe n'est pas le même")
      return;
    }
    const loginInfo = { email: email, password: password };

    setIsLoading(true);

    axios
      .post("http://localhost:4001/users", loginInfo)
      .then((response) => {
        setIsLoading(false);
        history.push("/dashboard", response.data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          if (err.response.status === 409) {
            setErrorMessage("Cette utilisateur existe déjà.");
          } else {
            console.log("Erreur:" + err);
          }
          setIsLoading(false);
        }
      });
  };
  return (
    <SignIn
      title={props.title}
      changeForm={props.changeForm}
      onSubmit={handleSubmit}
      email={email}
      changeEmail={({ target }) => setEmail(target.value)}
      password={password}
      changePassword={({ target }) => setPassword(target.value)}
      verifyPassword={verifyPassword}
      changeVerifyPassword={({target}) => setVerifyPassword(target.value)}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  );
};

export default SignInContainer;
