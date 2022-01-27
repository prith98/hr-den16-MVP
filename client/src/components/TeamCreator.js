import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { MainContext } from "../contexts/contexts.js";
import ReactDOM from 'react-dom';
import Select from 'react-select';



const teamFormat = Object.freeze({
  trainer: '',
  imgurl: '',
  team: [],
  pokemon1: {},
  pokemon2: {},
  pokemon3: {},
  pokemon4: {},
  pokemon5: {},
  pokemon6: {}
});

const TeamCreator = (props) => {

  const {teamCreatorModal, setTeamCreatorModal, pokemonNames, setPokemonNames} = useContext(MainContext);
  const [currentTeam, setCurrentTeam] = useState(teamFormat);
  const [selectedOption, setSelectedOption] = useState(null);

  const modalRef = useRef();

  const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../../../node_modules/pokemon-assets/assets/img/pokemon', false, /\.(png|jpe?g|svg)$/));


  const resetTeam = () => {
    setCurrentTeam(teamFormat);
  }

  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setTeamCreatorModal(false);
    }
  }

  const handleChange = (e) => {
    setCurrentTeam({
      ...currentTeam,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const dropDownSelect = () => {
    return (
    <select onClick={handlePokemonChange}>
    {pokemonNames.map((pokemon, i) => {
      return (
        <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
      )
    })}
    </select>
    );
  }

  const handlePokemonChange = (e) => {
    console.log(e.target.value)
    setCurrentTeam({
      ...currentTeam,

      // Trimming any whitespace
      [e.target.name]: {
        "pokemon": e.target.value.trim()
      }
    });
    return (
      <div>
        <img src={images[`${e.target.value.toLowerCase()}.png`]} width="100px"></img>
      </div>
    )
  };

  const filterPokemon = (e) => {
    console.log(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    currentTeam.team.push((currentTeam.pokemon1), (currentTeam.pokemon2), (currentTeam.pokemon3),
     (currentTeam.pokemon4), (currentTeam.pokemon5), (currentTeam.pokemon6))
    console.log(currentTeam);
    // ... submit to API or something
  };

  return ReactDOM.createPortal(
      <div className="teamModal" ref={modalRef} onClick={closeModal}>
        <div className="modal">
          <form>
            <div className="banner">
              <h1></h1>
            </div>
            <div className="colums">
              <div className="item">
                <label htmlFor="fname"> Trainer Name<span>*</span></label>
                <input onChange={handleChange} id="fname" type="text" name="trainer" required/>
              </div>
              <div className="item">
                <label htmlFor="address1">Pokemon 1<span>*</span></label>
                <select name="pokemon1" onClick={handlePokemonChange} required={true}>
                  {pokemonNames.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="address2">Pokemon 2<span>*</span></label>
                <select name="pokemon2" onClick={handlePokemonChange}>
                  {pokemonNames.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="state">Pokemon 3<span>*</span></label>
                <select name="pokemon3" onClick={handlePokemonChange}>
                  {pokemonNames.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="zip">Pokemon 4<span>*</span></label>
                <select name="pokemon4" onClick={handlePokemonChange}>
                  {pokemonNames.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="city">Pokemon 5<span>*</span></label>
                <select name="pokemon5" onClick={handlePokemonChange} required>
                  {pokemonNames.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="eaddress">Pokemon 6<span>*</span></label>
                <select name="pokemon6" onClick={handlePokemonChange}>
                  {pokemonNames.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
            </div>
            <div className="question">
              <label>Sprite Selection</label>
              <div className="question-answer">
                <div>
                  <input type="radio" value="Ash" id="radio_1" name="type"/>
                  <label htmlFor="radio_1" className="radio"><span>Ash</span></label>
                </div>
                <div>
                  <input  type="radio" value="none" id="radio_2" name="type"/>
                  <label htmlFor="radio_2" className="radio"><span>Brock</span></label>
                </div>
                <div>
                  <input  type="radio" value="none" id="radio_3" name="type"/>
                  <label htmlFor="radio_3" className="radio"><span>Ace Trainer</span></label>
                </div>
                <div>
                  <input type="radio" value="none" id="radio_4" name="contact"/>
                  <label htmlFor="radio_4" className="radio"><span>Steven</span></label>
                </div>
                <div>
                  <input  type="radio" value="none" id="radio_5" name="contact"/>
                  <label htmlFor="radio_5" className="radio"><span>Cyrus</span></label>
                </div>
                <div>
                  <input  type="radio" value="none" id="radio_6" name="contact"/>
                  <label htmlFor="radio_6" className="radio"><span>Lance</span></label>
                </div>
              </div>
            </div>
            {/* <div className="btn-block"> */}
              <button onClick={handleSubmit}>Submit</button>
            {/* </div> */}
          </form>
        </div>
      </div>,
  document.getElementById("app")
  );

}

export default TeamCreator;