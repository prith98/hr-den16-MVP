/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext, useRef, Fragment } from "react";
import axios from "axios";
import { MainContext } from "../contexts/contexts.js";
import ReactDOM from 'react-dom';


const PokedexViewer = (props) => {

  const {trainerList, setTrainerList, Pokedex, setPokedex, currentPokemonInfo, pokemonNames, setPokemonNames,
    setCurrentPokemonInfo, shinyStatus, setShinyStatus, currentPokemonLearnset, setCurrentPokemonLearnset} = useContext(MainContext);
  const [showPokedex, setShowPokedex] = useState(true);

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  const images = importAll(require.context('../../../node_modules/pokemon-assets/assets/img/pokemon', false, /\.(png|jpe?g|svg)$/));
  const itemImages = importAll(require.context('../../../node_modules/pokemon-assets/assets/img/items', false, /\.(png|jpe?g|svg)$/));

  const modalRef = useRef();

  const togglePokedex = () => {
    setShowPokedex(!showPokedex);
  }

  const formChange = (e) => {
    setPokedexQuery(e.target.value)
  }

  const dexSearch = () => {
    let results = pokemonNames.filter(pokemon => {
      return pokemon.includes(pokedexQuery);
    });
    console.log(results);
  }

  const defaultView = () => {
    return (
      <div className = "pokedexdefault">
        <h2>Click on a Pokemon to learn more!</h2>
        <img className="defaultdexview" src={'https://www.pinpng.com/pngs/m/222-2229682_professor-oak-png-pokemon-professor-oak-png-transparent.png'}></img>
      </div>
    )
  }

  const dexDisplay = () => {
    return (
      <div>
        {!shinyStatus ? <img className="PokemonIMG" src={`https://www.serebii.net/swordshield/pokemon/${currentPokemonInfo.dexNum}.png`}></img> : <img className="PokemonIMG" src={`https://www.serebii.net/Shiny/SWSH/${currentPokemonInfo.dexNum}.png`}></img>}
        <div>
          <button className="shiny" onClick={props.toggleShiny}>{!shinyStatus ? <img src={itemImages['poke-ball.png']}></img> :
           <img src={itemImages['luxury-ball.png']} ></img>}</button>
        </div>
        <table>
          <tbody>
            <tr>Pokedex Number: {currentPokemonInfo.dexNum}</tr>
            <tr>Pokemon Name: {currentPokemonInfo.name}</tr>
            <tr>Type(s):
              <ul>
                {currentPokemonInfo.types.map((ability, i) => {
                    return (<li key={i}>{ability}</li>)
                })}
              </ul>
            </tr>
            <tr>
              Abilities:
              <ul>
                {currentPokemonInfo.abilities.map((ability, i) => {
                    return (<li key={i}>{ability}</li>)
                })}
              </ul>
            </tr>
            <tr>
              Base Stats:
              <ul>
                <li>HP: {currentPokemonInfo.base_stats.hp}</li>
                <li>Attack: {currentPokemonInfo.base_stats.atk}</li>
                <li>Defense: {currentPokemonInfo.base_stats.def}</li>
                <li>Special Attack: {currentPokemonInfo.base_stats.spa}</li>
                <li>Special Defense: {currentPokemonInfo.base_stats.spd}</li>
                <li>Speed: {currentPokemonInfo.base_stats.spe}</li>
                <li>Base Stat Total: {currentPokemonInfo.base_stats.hp+currentPokemonInfo.base_stats.atk+currentPokemonInfo.base_stats.def+
                currentPokemonInfo.base_stats.spa+currentPokemonInfo.base_stats.spd+currentPokemonInfo.base_stats.spe}</li>
              </ul>
            </tr>
            <tr>Height(m): {currentPokemonInfo.heightm}</tr>
            <tr>Weight(kg): {currentPokemonInfo.weightkg}</tr>
            {/* <tr>
             Moveset:
              <div className="scroll">
              {currentPokemonLearnset ? currentPokemonLearnset.map((move, i) => {
                    return (<li key={i}>{move}</li>)
                }) : <div>Loading...</div>}
              </div>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }

  useEffect(() => {
    currentPokemonInfo ? dexDisplay() : <div>Loading...</div>
  }, []);


  return (
    <div className ="pokedex">
      {currentPokemonInfo ? dexDisplay() : defaultView()}
    </div>

  )

}

export default PokedexViewer;