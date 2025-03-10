import { Link } from "react-router-dom";
import logo from "@/assets/pokemon-logo.png";
import Ball from "@/assets/pokeball.png";

const Navbar = () => {
  return (
    <div className="flex bg-cyan-900 dark:bg-slate-800 w-full h-16 items-center justify-around p-5 ">
      <Link to="/">
        <div className="flex flex-row justify-center items-center ">
          <img src={logo} alt="Image not found." className="w-20 h-12" />
          <p className="p-4 font-bold text-white text-xl">POKEMON LIST</p>
        </div>
      </Link>
      <Link to="/mypokemon">
        <div className="flex flex-row">
          <img src={Ball} alt="Image not found." className=" w-16 h-16" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
