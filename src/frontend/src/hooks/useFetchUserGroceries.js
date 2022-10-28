import { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import {getGroceriesByUser} from "../services/GroceryService";

const useFetchUserGroceries = () => {
  const [groceries, setGroceries] = useState([]);
  const email = localStorage.getItem("userEmail");
  const history = useHistory();

  useEffect(() => {
    if (!email) {
      history.replace("/");
      return;
    }
    getGroceriesByUser(email)
        .then((response) => {
          setGroceries(response.data);
        })
        .catch((err) => console.log(err));
  }, [email, history]);

  return {groceries};
};

export default useFetchUserGroceries;
