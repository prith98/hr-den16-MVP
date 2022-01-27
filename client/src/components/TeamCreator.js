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
  const [sortedList, setSortedList] = useState(pokemonNames.sort());
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

  const exitModal = () => {
    setTeamCreatorModal(false);
  }

  const handleChange = (e) => {
    setCurrentTeam({
      ...currentTeam,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const imgurlSelector = (e) => {
    console.log(e.target.value)
    setCurrentTeam({
      ...currentTeam,

      // Trimming any whitespace
      imgurl: e.target.value
    });
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
  };

  const filterPokemon = (e) => {
    console.log(e.target.value);
  }

  const handleSubmit = (e) => {
    currentTeam.team.push((currentTeam.pokemon1), (currentTeam.pokemon2), (currentTeam.pokemon3),
     (currentTeam.pokemon4), (currentTeam.pokemon5), (currentTeam.pokemon6))
    let stateCopy = currentTeam;
    delete stateCopy.pokemon1
    delete stateCopy.pokemon2
    delete stateCopy.pokemon3
    delete stateCopy.pokemon4
    delete stateCopy.pokemon5
    delete stateCopy.pokemon6
    //STRINGIFY YOUR JSONS OTHERWISE MONGODB AIN'T GON READ IT
    setCurrentTeam(JSON.stringify(stateCopy));
    console.log(currentTeam)
    axios
      .post('/addTeam', currentTeam)
      .then(() => {
        props.getTeams();
      })
      .then(() => exitModal())
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
                <label htmlFor="pokemon1">Pokemon 1<span>*</span></label>
                <select name="pokemon1" onClick={handlePokemonChange} required={true}>
                  {sortedList.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="pokemon2">Pokemon 2<span>*</span></label>
                <select name="pokemon2" onClick={handlePokemonChange}>
                  {sortedList.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="pokemon3">Pokemon 3<span>*</span></label>
                <select name="pokemon3" onClick={handlePokemonChange}>
                  {sortedList.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="pokemon4">Pokemon 4<span>*</span></label>
                <select name="pokemon4" onClick={handlePokemonChange}>
                  {sortedList.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="pokemon5">Pokemon 5<span>*</span></label>
                <select name="pokemon5" onClick={handlePokemonChange} required>
                  {sortedList.map((pokemon, i) => {
                    return (
                      <option key={i}>{pokemon[0].toUpperCase() + pokemon.substring(1)}</option>
                    )
                  })}
                </select>
              </div>
              <div className="item">
                <label htmlFor="pokemon6">Pokemon 6<span>*</span></label>
                <select name="pokemon6" onClick={handlePokemonChange}>
                  {sortedList.map((pokemon, i) => {
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
                  <input onClick={imgurlSelector} type="radio" value="https://play.pokemonshowdown.com/sprites/trainers/ash-capbackward.png" id="radio_1" name="type"/>
                  <label htmlFor="radio_1" className="radio"><span>Ash<img src="https://play.pokemonshowdown.com/sprites/trainers/ash-capbackward.png"></img></span></label>
                </div>
                <div>
                  <input onClick={imgurlSelector} type="radio" value="https://play.pokemonshowdown.com/sprites/trainers/brock-gen3.png" id="radio_2" name="type"/>
                  <label htmlFor="radio_2" className="radio"><span>Brock<img src="https://play.pokemonshowdown.com/sprites/trainers/brock-gen3.png"></img></span></label>
                </div>
                <div>
                  <input onClick={imgurlSelector} type="radio" value="https://play.pokemonshowdown.com/sprites/trainers/acetrainerf-gen4dp.png" id="radio_3" name="type"/>
                  <label htmlFor="radio_3" className="radio"><span>Ace Trainer<img src="https://play.pokemonshowdown.com/sprites/trainers/acetrainerf-gen4dp.png"></img></span></label>
                </div>
                <div>
                  <input onClick={imgurlSelector} type="radio" value="https://play.pokemonshowdown.com/sprites/trainers/steven.png" id="radio_4" name="contact"/>
                  <label htmlFor="radio_4" className="radio"><span>Steven<img src="https://play.pokemonshowdown.com/sprites/trainers/steven.png"></img></span></label>
                </div>
                <div>
                  <input onClick={imgurlSelector} type="radio" value="https://play.pokemonshowdown.com/sprites/trainers/cyrus.png" id="radio_5" name="contact"/>
                  <label htmlFor="radio_5" className="radio"><span>Cyrus<img src="https://play.pokemonshowdown.com/sprites/trainers/cyrus.png"></img></span></label>
                </div>
                <div>
                  <input onClick={imgurlSelector} type="radio" value="https://play.pokemonshowdown.com/sprites/trainers/bugcatcher.png"id="radio_6" name="contact"/>
                  <label htmlFor="radio_6" className="radio"><span>Bug Catcher<img src="https://play.pokemonshowdown.com/sprites/trainers/bugcatcher.png"></img></span></label>
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