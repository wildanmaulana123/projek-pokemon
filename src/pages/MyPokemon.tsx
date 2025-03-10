import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { FC, useState, useEffect } from "react";
import Ball from "@/assets/pokeball.png";

interface pokemonType {
  name: string;
  image: string;
  nickname: string;
}

const MyPokemon: FC = () => {
  const [myPokemons, setMyPokemons] = useState<pokemonType[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    setMyPokemons(data);
  }, [handleDelete]);

  function handleDelete(index: any) {
    const filtered = myPokemons.filter((pokemon, i) => i !== index);
    localStorage.setItem("myPokemons", JSON.stringify(filtered));
    setMyPokemons(filtered);
  }

  return (
    <Layout>
      <div className="flex justify-center items-center">
        <h1 className="uppercase font-bold text-2xl pt-4">My Pokemon List</h1>
      </div>
      <div className="flex w-full items-center justify-around p-5 ">
        {myPokemons.length === 0 ? (
          <p>You haven't caught any Pokemon yet!</p>
        ) : (
          <div className="gap-4 m-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {myPokemons.map((pokemon, index) => (
              <div
                className="card border-cyan-900 dark:border-slate-200 justify-center items-center border-4 rounded-xl "
                key={index}
              >
                {" "}
                <Link to={`/pokemon/${pokemon.name}`}>
                  <img
                    id="img"
                    className="w-50 h-50"
                    src={Ball}
                    alt={pokemon.name}
                  />
                </Link>
                <div className=" text-xl  text-center text-white bg-cyan-900 rounded-md p-2">
                  <h2 className="uppercase">{pokemon.name}</h2>
                  <p> {pokemon.nickname}</p>
                  <button
                    className=" text-xl uppercase text-center text-white bg-red-900 rounded-md p-2"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyPokemon;
