import { useState } from "react";
import { useHistory } from "react-router-dom";
import SignUp from "../components/SignUp";
import { signUp } from "../services/AuthService";

const SignUpContainer = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== verifyPassword) {
            setErrorMessage("Le mot de passe n'est pas le même");
            return;
        }
        const signUpInfo = { name: name, email: email, password: password };
        setIsLoading(true);

        signUp(signUpInfo)
            .then(() => {
                setIsLoading(false);
                history.push("/dashboard", { name: name, email: email });
            })
            .catch((err) => {
                if (err.response.status === 409) {
                    setErrorMessage("Cette utilisateur existe déjà.");
                } else {
                    console.log("Erreur: " + err);
                }
                setIsLoading(false);
            });
    };
    return (
        <SignUp
            title={props.title}
            changeForm={props.changeForm}
            onSubmit={handleSubmit}
            name={name}
            changeName={({ target }) => setName(target.value)}
            email={email}
            changeEmail={({ target }) => setEmail(target.value)}
            password={password}
            changePassword={({ target }) => setPassword(target.value)}
            verifyPassword={verifyPassword}
            changeVerifyPassword={({ target }) =>
                setVerifyPassword(target.value)
            }
            isLoading={isLoading}
            errorMessage={errorMessage}
        />
    );
};

export default SignUpContainer;
