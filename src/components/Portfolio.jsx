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
    <div className="grid col-span-2 row-span-1">
      <div className="grid grid-cols-2 grid-rows-[56px_200px] shadow-md rounded-xl bg-white">
        <p className="font-bold p-4 col-span-1">Your Portfolio</p>
        <p className="font-light p-4 col-span-1">
          Total Value: <b className="font-bold">$1000</b>
        </p>
        <div className="flex justify-center col-span-2 row-span-1 ">
          <Pie data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
