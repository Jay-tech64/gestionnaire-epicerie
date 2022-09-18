import { useState } from "react";
import Login from "./LogIn";
import SignIn from "./SignIn";

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const title = "Gestionnaire d'épicerie";

  const handleChangeForm = () => {
    setIsLogin(!isLogin);
  };

  return isLogin ? (
    <Login title={title} changeForm={handleChangeForm} />
  ) : (
    <SignIn title={title} changeForm={handleChangeForm} />
  );
};

export default Home;
