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
  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <>
      <div className=" p-4 rounded-xl shadow-md bg-white col-span-3 row-span-1">
        <div className="grid col-span-13 gap-2">
          <button className="col-start-3 col-span-1 border-2 rounded-xl shadow-md hover:bg-blue-100 h-[54px]">
            1D
          </button>
          <button className="col-start-4 col-span-1 border-2 rounded-xl shadow-md hover:bg-blue-100 h-[54px]">
            1W
          </button>
          <button className="col-start-5 col-span-1 border-2 rounded-xl shadow-md hover:bg-blue-100 h-[54px]">
            1M
          </button>
          <button className="col-start-6 col-span-1 border-2 rounded-xl shadow-md hover:bg-blue-100 h-[54px]">
            6M
          </button>
          <button className="col-start-7 col-span-1 border-2 rounded-xl shadow-md hover:bg-blue-100 h-[54px]">
            1Y
          </button>
          <div className="col-start-11 col-span-6 flex gap-4">
            <DropDown />
            <DropDown />
          </div>
        </div>

        <div className="flex justify-center m-4">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
}
