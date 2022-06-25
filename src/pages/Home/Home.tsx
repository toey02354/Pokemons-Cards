import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div className="grid grid-cols-4 gap-4 bg-red-300">
        {pokemonCards.map((pokeCard, index) => (
          <div className="bg-white">{pokeCard}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
