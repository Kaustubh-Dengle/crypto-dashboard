import Nav from "./Nav";
import MainDashboard from "./MainDashboard";

export default function Dashboard() {
  return (
    <>
      <Nav />
      <div className="pr-[128px] pl-[128px] px-[16px] py-[16px] w-full h-full">
        <MainDashboard />
      </div>
    </>
  );
} 