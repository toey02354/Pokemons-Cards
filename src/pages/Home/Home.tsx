import React, { useEffect, useState } from "react";
import axios from "axios";

interface Pokemons {
  id: number;
  name: string;
  url: string;
}

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [sortById, setSortById] = useState<boolean>(true);
  const [newCardsIndex, setNewCardsindex] = useState(0);
  const [pokemons, setPokemon] = useState<Pokemons[]>([
    { id: 0, name: "", url: "" },
  ]);

  const getPokemonsById = async (
    cardsindex: number = 1,
    moreCards: number = newCardsIndex
  ) => {
    setLoading(true);
    let newPoke: Pokemons[] = [];
    while (cardsindex + moreCards < 13 + moreCards) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${cardsindex + moreCards}`)
        .then((res) => {
          //   console.log(res.data);
          newPoke[cardsindex] = {
            id: cardsindex + moreCards - 1,
            name: res.data.name,
            url: res.data.sprites.front_default,
          };
        })
        .catch((err) => {
          console.log(err);
        });
      cardsindex++;
    }
    setPokemon(newPoke);
    setLoading(false);
  };

  const SortThemByID = () => {
    if (!sortById) {
      setPokemon((currPokemnons) =>
        currPokemnons.sort((a, b) => {
          let keyA = a.id,
            keyB = b.id;
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        })
      );
    } else {
      setPokemon((currPokemons) =>
        currPokemons.sort((a, b) => {
          let keyA = a.name,
            keyB = b.name;
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        })
      );
    }
  };

  useEffect(() => {
    getPokemonsById();
    SortThemByID();
  }, [newCardsIndex]);

  useEffect(() => {
    console.log(sortById);
    // console.log(pokemons);
    SortThemByID();
  }, [sortById, pokemons]);

  return (
    <div className="h-screen w-screen flex flex-col justify-between gap-8 p-[3rem] bg-[#F6F6F7]">
      <div className="flex flex-col gap-4">
        <div className="w-full h-[3rem] flex flex-row justify-between items-start">
          <div className="flex text-[32px]">All Pokemon!</div>
          <div className="flex gap-4">
            <label className="flex gap-4 justify-center items-center">
              <input
                type="radio"
                name="SortName"
                id="sortName"
                checked={!sortById}
                onChange={() => {
                  setSortById(false);
                }}
              />
              Sort Name
              <input
                type="radio"
                name="SortId"
                id="sortId"
                checked={sortById}
                onChange={() => {
                  setSortById(true);
                }}
              />
              Sort ID
            </label>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 ">
          {loading
            ? "loading..."
            : pokemons.map((pokeCard, index) => (
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
      <div className="flex justify-between">
        <button
          disabled={newCardsIndex <= 0}
          className={`BTN-FOOTER`}
          onClick={() => {
            setSortById(true);
            setNewCardsindex((curr) => curr - 12);
          }}
        >
          Previous 12
        </button>
        <button
          className={`BTN-FOOTER`}
          onClick={() => {
            setSortById(true);
            setNewCardsindex((curr) => curr + 12);
          }}
        >
          Next 12
        </button>
      </div>
    </div>
  );
};

export default Home;
