import React, { useState, useEffect } from "react";
import axios from "axios";
import { MainContext } from "./contexts/contexts.js";
import types from "pokemon-assets/assets/data/types.json";
import pokedex from "pokemon-assets/assets/data/pokemon.json";
import TeamCreator from './components/TeamCreator.js'
import TeamList from './components/TeamList.js';
import PokedexViewer from './components/PokedexViewer.js';
import TrainerSearchBar from './components/TrainerSearchBar.js';
import PokemonSearchBar from './components/PokemonSearchBar.js';
import PokedexSearchBar from './components/PokedexSearchBar.js';

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

  const getMoves = (pokemon) => {
    console.log(pokemon)
    // let moveset = [];
    // axios
    //   .get(`/pokeapi/moves?pokemon=${pokemon}`)
    //   .then((data) => {
    //     data.data.forEach(move => {
    //       let currentMove = move.move.name;
    //       currentMove = currentMove.charAt(0).toUpperCase() + currentMove.slice(1);
    //       moveset.push(currentMove);
    //     })
    //   })
    //   .then(() => {
    //     console.log(moveset)
    //     setCurrentPokemonLearnset(moveset);
    //   })
  }

  const getTeams = () => {
    axios
    .get('/getTeams')
    .then((data) => {
      // console.log(data.data);
      setTrainerList(data.data);
      setFilterTrainerList(data.data);
    })
  }

  const toggleShiny = () => {
    setShinyStatus(!shinyStatus)
  }

  const getPokemonNames = () => {
    let pokemonName = Object.keys(Pokedex).filter((pokemon) => {
      return !(pokemon.includes('mega') || pokemon.includes('gmax'));
    });
    // console.log(pokemonName)
    setPokemonNames(pokemonName);
  }

  const openModal = () => {
    setTeamCreatorModal(true);
  }

  const closeModal = function (e) {
    if (e.target === this.modalRef.current) {
      setTeamCreatorModal(false);
    }
  }

  useEffect(() => {
    getTeams(),
    getPokemonNames();
  }, [])

  return (
    <div className='main'>
    <MainContext.Provider value={{trainerList, setTrainerList, pokemonNames, setPokemonNames, filterTrainerList, setFilterTrainerList, Pokedex, setPokedex,
       teamCreatorModal, setTeamCreatorModal, currentPokemonLearnset, setCurrentPokemonLearnset, Types, setTypes, currentPokemonInfo, setCurrentPokemonInfo, shinyStatus, setShinyStatus}}>
      {teamCreatorModal ? <TeamCreator getMoves={getMoves} getTeams={getTeams} openModal={openModal}/> : <button onClick={openModal}> Create A Team</button>}
      < TrainerSearchBar />
      < PokemonSearchBar />
      < PokedexSearchBar getMoves={getMoves} />
      < TeamList getMoves={getMoves}/>
      < PokedexViewer toggleShiny={toggleShiny}/>
    </MainContext.Provider>
    </div>
  );
};

export default App;
