import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { MainContext } from "../contexts/contexts.js";

const PokemonSearchBar = (props) => {

  const {trainerList, setTrainerList, filterTrainerList, setFilterTrainerList} = useContext(MainContext);
  const[pokemonQuery, setPokemonQuery] = useState("");

  const onFormChange = function(e) {
    setPokemonQuery(e.target.value);
  }

  const onQueryChange = function () {
    let filter = filterPokemon();
    if (pokemonQuery.length >= 2) {
      setFilterTrainerList(filter)
    } else {
      setFilterTrainerList(trainerList)
    }
  }

  const clearQuery = (e) => {
    e.preventDefault();
    setPokemonQuery("");
  }

  const filterPokemon = function() {
    let result = [];
    for (let i = 0; i < trainerList.length; i++) {
      const trainer = trainerList[i];
      const team = trainer.team;
      for (let j = 0; j < team.length; j++) {
        if (team[j].pokemon.toLowerCase().includes(pokemonQuery.toLowerCase())) {
          result.push(trainer);
          break;
        }
      }
    }
    return result;
  }

  useEffect(() => {

    filterTrainerList && trainerList && onQueryChange()

  }, [pokemonQuery])

  return (
    <div className="form-center">
      <span>Filter by Pokemon</span>
      <form id="formQASearch">
        <label>
          <input
            name="search"
            id="QASearch"
            type="text"
            value={pokemonQuery}
            placeholder="ex: Pikachu"
            onChange={onFormChange}
            />
        </label>
        {pokemonQuery.length ? <button onClick={clearQuery}>Clear Query</button> : null}
      </form>
    </div>
  )

}

export default PokemonSearchBar;