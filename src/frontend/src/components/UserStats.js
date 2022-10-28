import chart from "../assets/chart.png";

const UserStats = () => {
    return (
        <article className="m-3 p-2 h-90 col-sm-6 bg-white">
            <div className="header d-flex justify-content-center align-items-center">
                <h1 className="fs-3">Statistiques</h1>
            </div>
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
        </article>
    );
};

export default UserStats;
