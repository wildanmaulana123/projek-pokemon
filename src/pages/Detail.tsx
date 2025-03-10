import { TbHome, TbPokeball, TbClover } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import Layout from "@/components/Layout";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface pokemonType {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
  };
  img: string;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  type: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
}

const PokemonDetail: FC = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState<Partial<pokemonType>>({});
  const history = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemonData(data);
    }
    fetchData();
  }, [id]);

  function handleCatch() {
    const random = Math.random() < 0.5;
    if (random) {
      const pokemonNickname = prompt(
        `Congratulations! You caught ${pokemonData.name}! Please give it a nickname.`
      );
      if (pokemonNickname) {
        const pokemon = { name: pokemonData.name, nickname: pokemonNickname };
        const myPokemons = JSON.parse(
          localStorage.getItem("myPokemons") || "[]"
        );
        myPokemons.push(pokemon);
        localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
        history("");
        toast.success(
          `You caught ${pokemonData.name} and gave it a nickname: ${pokemonNickname}!`
        );
      }
    } else {
      toast.error(`Oops! ${pokemonData.name} ran away.`);
    }
  }

  return (
    <Layout>
      <ToastContainer />

      <div className="gap-4 m-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="card border-cyan-900 dark:border-slate-200 justify-center items-center border-4 rounded-xl ">
          <img
            className="w-full"
            src={pokemonData.sprites?.front_default}
            alt={pokemonData.name}
          />
          <h1
            className=" text-xl uppercase text-center text-white bg-cyan-900 rounded-md p-2"
            id="name"
          >
            {pokemonData.name}
          </h1>
        </div>
        <div className="justify-center items-center">
          <div className="card p-2 border-4 rounded-xl  border-cyan-900 dark:border-slate-200">
            <div className=" text-xl uppercase text-center text-white bg-cyan-900 rounded-md p-2">
              <h2>Stats</h2>
            </div>
            <div className="w-full p-3 text-xl">
              {pokemonData.stats?.map((stat) => (
                <div key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </div>
              ))}
            </div>
          </div>
          <br />
          <div className="card p-2 border-4 rounded-xl  border-cyan-900 dark:border-slate-200">
            <div className=" text-xl uppercase text-center text-white bg-cyan-900 rounded-md p-2">
              <h2>Abilities</h2>
            </div>
            <div className="w-full p-3 text-2xl">
              {pokemonData.abilities?.map((ability) => (
                <div key={ability.ability.name}>{ability.ability.name}</div>
              ))}
            </div>
          </div>
          <br />
          <div className="flex gap-2 justify-center items-center">
            <button
              onClick={() => history("/")}
              className="text-xl  bg-cyan-900 border-cyan-900 dark:border-slate-200 justify-center items-center border-4 rounded-xl "
            >
              <TbHome className="h-20 w-24" />
              Home
            </button>
            <button
              onClick={handleCatch}
              className="text-xl text-green-700 bg-cyan-900 border-cyan-900 dark:border-slate-200 justify-center items-center border-4 rounded-xl "
            >
              <TbPokeball className="w-32 h-20" />
              Catch
            </button>
            <button
              onClick={() => history("/mypokemon")}
              className="text-xl  bg-cyan-900 border-cyan-900 dark:border-slate-200 justify-center items-center border-4 rounded-xl "
            >
              <TbClover className="h-20 w-24" />
              Save
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
