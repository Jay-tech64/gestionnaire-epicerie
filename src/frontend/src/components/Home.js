import { useState } from "react";
import SignInContainer from "../containers/SignInContainer";
import "../index.css";
import SignUpContainer from "../containers/SignUpContainer";

const Home = () => {
    const [isLogin, setIsLogin] = useState(true);
    const title = "Gestionnaire d'épicerie";

    const handleChangeForm = () => {
        setIsLogin(!isLogin);
    };

    return isLogin ? (
        <SignInContainer title={title} changeForm={handleChangeForm} />
    ) : (
        <SignUpContainer title={title} changeForm={handleChangeForm} />
    );
};

export default Home;
