import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { MainContext } from "../contexts/contexts.js";

const TrainerSearchBar = (props) => {

  const {trainerList, setTrainerList, filterTrainerList, setFilterTrainerList} = useContext(MainContext);
  const[trainerQuery, setTrainerQuery] = useState("");

  const onFormChange = function(e) {
    setTrainerQuery(e.target.value);
  }

  const onQueryChange = function () {
    let filter = filterTrainers();
    if (trainerQuery.length >= 3) {
      setFilterTrainerList(filter)
    } else {
      setFilterTrainerList(trainerList)
    }
  }

  const clearQuery = (e) => {
    e.preventDefault();
    setTrainerQuery("");
  }

  const filterTrainers = function() {
    const result = trainerList.filter(trainer =>
      trainer.trainer.toLowerCase().includes(trainerQuery.toLowerCase())
    );
    return result;
  }

  useEffect(() => {

    filterTrainerList && trainerList && onQueryChange()

  }, [trainerQuery])

  return (
    <div className="form-center">
      <span>Filter by Trainer Name</span>
      <form id="formQASearch">
        <label>
          <input
            name="search"
            id="QASearch"
            type="text"
            value={trainerQuery}
            placeholder="ex: Red"
            onChange={onFormChange}
            />
        </label>
        {trainerQuery.length ? <button onClick={clearQuery}>Clear Query</button> : null}
      </form>
    </div>
  )

}

export default TrainerSearchBar;