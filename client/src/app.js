import React, { useState, useEffect } from "react";
import axios from "axios";
import { MainContext } from "./contexts/contexts.js";
import pokedex from "pokemon-assets/assets/data/pokemon.json";

const App = (props) => {
  const [trainerList, setTrainerList] = useState(null);
  const [Pokedex, setPokedex] = useState(pokedex);
  const [teamCreatorModal, setTeamCreatorModal] = useState(false);
  const [Types, setTypes] = useState(types);
  const [currentPokemonInfo, setCurrentPokemonInfo] = useState(null);
  const [trainerNames, setTrainerNames] = useState(null);
  const [filterTrainerList, setFilterTrainerList] = useState(null);
  const [pokemonNames, setPokemonNames] = useState(null);
  const [shinyStatus, setShinyStatus] = useState(false);
  const [currentPokemonLearnset, setCurrentPokemonLearnset] = useState(null);

  const getTeams = () => {
    axios
    .get('/getTeams')
    .then((data) => {
      console.log(data.data);
      setTrainerList(data.data);
      setFilterTrainerList(data.data);
    })
  }

  const getPokemonNames = () => {
    let pokemonName = Object.keys(Pokedex).filter((pokemon) => {
      return !(pokemon.includes('mega') || pokemon.includes('gmax'));
    });
    console.log(pokemonName)
    setPokemonNames(pokemonName);
  }

  useEffect(() => {
    getTeams(),
    getPokemonNames();
  }, [])

  return (
    <div className='main'>
    <MainContext.Provider value={{trainerList, setTrainerList, pokemonNames, setPokemonNames, filterTrainerList, setFilterTrainerList, Pokedex, setPokedex,
       teamCreatorModal, setTeamCreatorModal, currentPokemonLearnset, setCurrentPokemonLearnset, Types, setTypes, currentPokemonInfo, setCurrentPokemonInfo, shinyStatus, setShinyStatus}}>
      {teamCreatorModal ? <TeamCreator getMoves={getMoves} openModal={openModal} closeModal={closeModal}/> : <button onClick={openModal}> Create A Team</button>}

    </MainContext.Provider>
    </div>
  );
};

export default App;
