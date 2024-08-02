import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

export default function Portfolio() {
  const chartData = {
    labels: ["Tether", "Luna", "Ethereum"],
    datasets: [
      {
        data: [450, 250, 300],
        backgroundColor: ["#50A3F0", "#F98E8E", "#5AC8AE"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="grid grid-cols-2 grid-rows-4 w-1/4 p-4 m-4 shadow-md rounded-xl">
      <p className="font-bold p-4 m-4 col-span-1">Your Portfolio</p>
      <p className="font-light p-4 m-4 col-span-1">
        Total Value: <b className="font-bold">$1000</b>
      </p>
      <div className="col-span-2 row-span-4 pb-4">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
