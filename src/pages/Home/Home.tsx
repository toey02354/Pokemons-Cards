import React, { useEffect, useState } from "react";
import axios from "axios";

interface Pokemons {
  name: string;
  url: string;
}

const Home = () => {
  const [pokemons, setPokemon] = useState<Pokemons[]>([{ name: "", url: "" }]);

  const getPokemons = async () => {
    let newPoke: Pokemons[] = [];
    for (let i = 1; i < 13; i++) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((res) => {
          console.log(res.data);
          //   setPokemon(res.data.results);
          newPoke[i] = {
            name: res.data.name,
            url: res.data.sprites.front_default,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setPokemon(newPoke);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const pokemonCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="h-screen w-screen flex flex-col p-8 bg-[#F6F6F7]">
      <div className="w-full flex flex-row justify-between items-start">
        <div className="text-[48px]">All Pokemon!</div>
        <div className="flex gap-4">
          <label className="flex gap-4 justify-center items-center">
            <input type="radio" name="Sort Name" id="sortName" /> Sort Name
            <input type="radio" name="" id="" /> Sort ID
          </label>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 ">
        {pokemons.map((pokeCard, index) => (
          <div
            key={`pokemons-${index}`}
            className="flex bg-white p-4 items-center gap-4 rounded-xl border-[2px]"
          >
            <img
              height={72}
              width={72}
              className="bg-gray-300 rounded-full"
              src={pokeCard.url}
            ></img>
            <div className="text-[1rem]">
              {pokeCard.name[0].toUpperCase() + pokeCard.name.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
