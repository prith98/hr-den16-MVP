/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext, useRef, Fragment } from "react";
import axios from "axios";
import { MainContext } from "../contexts/contexts.js";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const PokedexSearchBar = (props) => {

  const {Pokedex, setPokedex, currentPokemonInfo, pokemonNames, setPokemonNames, shinyStatus, setShinyStatus,
    setCurrentPokemonInfo, currentPokemonLearnset, setCurrentPokemonLearnset} = useContext(MainContext);
  const [pokedexQuery, setPokedexQuery] = useState("");

  const formChange = function(e) {
    setPokedexQuery(e.target.value);
  }

  const pokeInfo = (pokemon) => {
    // if (typeof pokemon === 'number') {
    //   if (pokemon.toString().length < 3) {
    //     alert('Please Enter Dex Number in format with starting 0`s such that query is 3 digits long');
    //     return;
    //   }
    // }
    let currentPokeInfo = {};
    let entry = Pokedex[pokemon];
    pokemon.includes('-') ? entry = Pokedex[pokemon.replace('-', '')] : entry = entry;
    console.log(pokemon)
    currentPokeInfo["dexNum"] = entry["num"];
    if (currentPokeInfo["dexNum"] < 100) {
      currentPokeInfo["dexNum"] = currentPokeInfo["dexNum"].toString().padStart(3, '0');
    }
    currentPokeInfo["alias"] = entry.alias;
    currentPokeInfo["name"] = entry["name"];
    currentPokeInfo["abilities"] = [];
    currentPokeInfo["types"] = [];
    Object.values(entry["abilities"]).forEach(ability => {currentPokeInfo["abilities"].push(ability)});
    Object.values(entry["types"]).forEach(type => {currentPokeInfo["types"].push(type)});
    currentPokeInfo["base_stats"] = entry.baseStats
    currentPokeInfo["genderRatio"] = entry.genderRatio;
    currentPokeInfo["heightm"] = entry.heightm;
    currentPokeInfo["weightkg"] = entry.weightkg;
    currentPokeInfo["shiny"] = false;
    console.log(currentPokeInfo)
    // setCurrentPokemonLearnset(props.getMoves(pokemon));
    setShinyStatus(false);
    setCurrentPokemonInfo(currentPokeInfo);
  }

  const dexSearch = (e) => {
    e.preventDefault();
    let results = pokemonNames.filter(pokemon => {
      return pokemon.includes(pokedexQuery.toLowerCase());
    });
    if (results.length >= 1) {
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        if (results[i] === pokedexQuery) {
          pokeInfo(results[i]);
          return;
        }
      }
      pokeInfo(results[0]);
    } else {
      alert('Invalid Search')
    }
  }

  const clearQuery = (e) => {
    e.preventDefault();
    setPokedexQuery("");
  }

  // useEffect(() => {
  //   pokemonNames ? formChange() : null;
  // }, [pokedexQuery])

  return (
    <div className="form-center">
      <span>Search for Pokemon</span>
      <form id="formQASearch">
        <label>
          <input
            name="search"
            id="QASearch"
            type="text"
            value={pokedexQuery}
            placeholder="ex: charizard"
            onChange={formChange}
            />
        </label>
        {pokedexQuery.length ? <button onClick={clearQuery}>Clear Query</button> : null}
        <button onClick={dexSearch}>Search</button>
      </form>
  </div>
  )

}

export default PokedexSearchBar;












    //   <div className="form-center">
    //   <span>Search for Pokemon</span>
    //   <form id="formQASearch">
    //     <label>
    //       <input
    //         name="search"
    //         id="QASearch"
    //         type="text"
    //         value={pokedexQuery}
    //         placeholder="ex: charizard"
    //         onChange={formChange}
    //         />
    //     </label>
    //     <button onClick={dexSearch}>Search</button>
    //   </form>
    // </div>