import logo from "../assets/alma-logo.png"

export default function Nav() {
  return (
    <>
      <nav className="flex w-full p-2 h-20 shadow-md">
        <img src={logo} alt="Almabetter logo" className="p-3 pl-10 h-16 object-center" />
      </nav>
    </>
  );
}
