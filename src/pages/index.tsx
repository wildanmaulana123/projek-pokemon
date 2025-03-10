import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import { FC, useState, useEffect, SetStateAction } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

interface pokemonType {
  name: string;
  img: string;
  url: string;
}

const PokemonList: FC = () => {
  const [pokemonList, setPokemonList] = useState<pokemonType[]>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState<SetStateAction<string>>("");
  const [prevPageUrl, setPrevPageUrl] = useState<SetStateAction<string>>("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(currentPageUrl);
      const data = await response.json();
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
      setPokemonList(data.results);
    }
    fetchData();
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  return (
    <Layout>
      <div className="flex w-full items-center justify-around p-5 ">
        <div className="flex flex-row ">
          {prevPageUrl && (
            <button onClick={goToPrevPage}>
              <IoMdArrowDropleftCircle className="w-12 h-12" />
            </button>
          )}
        </div>
        <h1 className="font-bold  md:text-2xl">POKEMON LIST</h1>
        <div className="flex flex-row ">
          {nextPageUrl && (
            <button onClick={goToNextPage}>
              {" "}
              <IoMdArrowDroprightCircle className="w-12 h-12" />
            </button>
          )}
        </div>
      </div>
      <div className="gap-4 m-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {pokemonList.map((pokemon) => (
          <div className="card border-cyan-900 dark:border-slate-200 justify-center items-center border-4 rounded-xl ">
            <div key={pokemon.name}>
              <Link to={`/pokemon/${pokemon.name}`}>
                <img
                  className="w-full"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    pokemon.url.split("/")[6]
                  }.png`}
                  alt={pokemon.name}
                />
                <p
                  className=" text-xl uppercase text-center text-white bg-cyan-900 rounded-md p-2"
                  id="name"
                >
                  {pokemon.name}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-around p-5 ">
        <div className="flex flex-row ">
          {prevPageUrl && (
            <button onClick={goToPrevPage}>
              <IoMdArrowDropleftCircle className="w-12 h-12" />
            </button>
          )}
        </div>
        <h1 className="font-bold  md:text-2xl">POKEMON LIST</h1>
        <div className="flex flex-row ">
          {nextPageUrl && (
            <button onClick={goToNextPage}>
              {" "}
              <IoMdArrowDroprightCircle className="w-12 h-12" />
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PokemonList;
