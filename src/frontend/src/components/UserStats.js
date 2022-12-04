import chart from "../assets/chart.png";
import { useEffect, useState } from "react";
import { getAllGroceriesTotalPrice } from "../services/GroceryService";
import { PieChart, Pie, Legend, Cell } from "recharts";
import useFetchUserGroceries from "../hooks/useFetchUserGroceries";

const UserStats = () => {
    const { groceries } = useFetchUserGroceries();
    const email = localStorage.getItem("userEmail");
    const [sumTotalPrices, setSumTotalPrices] = useState("");
    const data = groceries
        .filter((entry) => !entry.isCompleted)
        .map((grocery) => {
            return { name: grocery.name, value: grocery.totalPrice };
        });
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const RADIAN = Math.PI / 180;

    useEffect(() => {
        getAllGroceriesTotalPrice(email)
            .then((response) => {
                setSumTotalPrices(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [email]);

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

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
                        Répartition du prix total des épiceries :
                    </p>
                    <PieChart width={400} height={400}>
                        <Legend verticalAlign="top" />
                        <Pie
                            data={data}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                    </PieChart>
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
