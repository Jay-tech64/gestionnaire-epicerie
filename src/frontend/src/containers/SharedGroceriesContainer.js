import React from "react";
import SharedGroceries from "../views/SharedGroceries";
import { useLocation } from "react-router-dom";

const SharedGroceriesContainer = () => {
    const location = useLocation();
    const { state } = location;
    const user = state?.user;

    return <SharedGroceries user={user} />;
};

export default SharedGroceriesContainer;
