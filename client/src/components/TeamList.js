/* eslint-disable react/jsx-key */
/* eslint-disable */

import React, { useState, useEffect, useContext, useRef, Fragment, requireContext } from "react";
import axios from "axios";
import { MainContext } from "../contexts/contexts.js";
// import * as fs from 'fs.realpath';

const TeamList = (props) => {

  const {trainerList, setTrainerList, filterTrainerList, pokemonNames, setPokemonNames, currentPokemonLearnset, setCurrentPokemonLearnset,
     setFilterTrainerList, Pokedex, setPokedex, currentPokemonInfo, setCurrentPokemonInfo, shinyStatus, setShinyStatus} = useContext(MainContext);

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../../../node_modules/pokemon-assets/assets/img/pokemon', false, /\.(png|jpe?g|svg)$/));
  const itemImages = importAll(require.context('../../../node_modules/pokemon-assets/assets/img/items', false, /\.(png|jpe?g|svg)$/));

  const pokeInfo = (e) => {
    let currentPokeInfo = {};
    let pokemon = e.currentTarget.dataset.id.toLowerCase();
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
    setCurrentPokemonLearnset(props.getMoves(pokemon));
    setShinyStatus(false);
    setCurrentPokemonInfo(currentPokeInfo);
  }

  return (
    <table className="mainTable">
      <tbody>
        <tr>
          <th>Trainers</th>
          <th><img src={itemImages['poke-ball.png']}></img></th>
          <th><img src={itemImages['great-ball.png']}></img></th>
          <th><img src={itemImages['ultra-ball.png']}></img></th>
          <th><img src={itemImages['luxury-ball.png']}></img></th>
          <th><img src={itemImages['love-ball.png']}></img></th>
          <th><img src={itemImages['master-ball.png']}></img></th>
        </tr>
        {filterTrainerList && trainerList ? filterTrainerList.map((trainer, i) => {
          const team = trainer.team;
          return (
            <Fragment>
              <tr>
                <td key={trainer.trainer}><img src={trainer.imgurl}></img><div>{trainer.trainer}</div></td>
                {team.map(pokemon => {
                  return  (
                    <td className="indivPokemon" data-id={pokemon.pokemon} onClick={pokeInfo}><img className="indivPokemon" src={images[`${pokemon.pokemon.toLowerCase()}.png`]} width="150px"></img></td>
                  )
                })}
              </tr>
            </Fragment>
          );
        }) : null}
      </tbody>
    </table>
  );



}

export default TeamList;