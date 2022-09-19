import { useState } from "react";
import LoginContainer from "../containers/LoginContainer";
import "../index.css";
import SignInContainer from "../containers/SignInContainer";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const title = "Gestionnaire d'épicerie";

  const handleChangeForm = () => {
    setIsLogin(!isLogin);
  };

  return isLogin ? (
    <LoginContainer title={title} changeForm={handleChangeForm} />
  ) : (
    <SignInContainer title={title} changeForm={handleChangeForm} />
  );
};

export default Home;
