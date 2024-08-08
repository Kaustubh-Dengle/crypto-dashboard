import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import DropDown from "./UI/DropDown";

Chart.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
        tension: 0.4,
      },
    ],
  };
  const options = {};

  return (
    <>
      <div className="w-2/3 p-4 rounded-xl shadow-md">
        <div className="flex gap-4">
          <button className="">1D</button>
          <button>1W</button>
          <button>1M</button>
          <button>6M</button>
          <button>1Y</button>
          <div className="flex justify-items-end gap-4">
            <DropDown />
            <DropDown />
          </div>
        </div>

        <div>
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
}
