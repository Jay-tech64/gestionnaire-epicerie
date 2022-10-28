import chart from "../assets/chart.png";
import { useEffect, useState } from "react";
import { getAllGroceriesTotalPrice } from "../services/GroceryService";

const UserStats = () => {
    const email = localStorage.getItem("userEmail");
    const [sumTotalPrices, setSumTotalPrices] = useState("");

    useEffect(() => {
        getAllGroceriesTotalPrice(email)
            .then((response) => {
                setSumTotalPrices(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    return (
        <article className="m-3 p-2 h-90 col-sm-6 bg-white">
            <div className="header d-flex justify-content-center align-items-center">
                <h1 className="fs-3">Statistiques</h1>
            </div>
            {sumTotalPrices ? (
                <div>
                    <p
                        className={"fs-4 m-0"}
                        style={{
                            fontFamily: "'Fuzzy Bubbles', cursive",
                        }}
                    >
                        Sommes de toutes les épiceries :
                    </p>
                    <p>{sumTotalPrices.toFixed(2)} $</p>
                </div>
            ) : (
                <div
                    className={
                        "d-flex flex-column align-items-center justify-content-center h-75"
                    }
                >
                    <img
                        className={"mb-3"}
                        src={chart}
                        alt={"Icône d'un graphique"}
                    />
                    <p
                        style={{
                            fontFamily: "'Fuzzy Bubbles', cursive",
                            fontSize: "20px",
                        }}
                    >
                        Aucune statistique pour l'instant
                    </p>
                </div>
            )}
        </article>
    );
};

export default UserStats;
