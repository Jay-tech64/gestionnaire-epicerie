import { useState } from "react";
import { useHistory } from "react-router-dom";
import SignIn from "../components/SignIn";
import { signIn } from "../services/AuthService";

const SignInContainer = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const userInfo = { email: email, password: password };
        setIsLoading(true);
        signIn(userInfo)
            .then((response) => {
                setIsLoading(false);
                if (response.data == null) {
                    setErrorMessage("Utilisateur inexistant");
                } else {
                    history.push("/dashboard", response.data);
                }
            })
            .catch((err) => {
                if (err.response.status === 0) {
                    setErrorMessage(
                        "Erreur de connexion avec le serveur. Veuillez réessayer plus tard."
                    );
                } else if (err.response.status === 401) {
                    setErrorMessage("Courriel ou mot de passe incorrect.");
                } else {
                    console.log("Erreur: " + err);
                }
                setIsLoading(false);
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
            isLoading={isLoading}
            errorMessage={errorMessage}
        />
    );
};

export default SignInContainer;
