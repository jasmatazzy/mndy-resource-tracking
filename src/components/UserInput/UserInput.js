import React, { useState, useEffect } from "react";

const UserInput = () => {
  const [boardIds, setBoardIds] = useState();

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  //getter query here

  const mondayQuery = (q) => {
    let query = q;

    fetch("https://api.monday.com/v2", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `${process.env.REACT_APP_API_KEY_mondayps}`,
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(JSON.stringify(res, null, 2)));
  };

  //0. code flow
  //1. read all item text columns on board to get corresponding child board ids from active projects group
  //2. map over those ids to return all subitems
  //3. sort those subitems by user id
  //4. aggregate capacity across active projects
  //5. aggregate timeline across all active projects (seems similar to alphabetizing algorithm, just taking the earliest and latest days in the timeline)
  //6. TODO: consider if it's worth it to have discrete timelines for each subtask instead of the overall average (edge case being a vacation or other gap where effort shouldn't be tracked)

  //implenting code flow 1
  useEffect(() => {
    mondayQuery(`query {
    boards (ids: 1240579246) {
      name
      state
      id
      permissions
    }
  }`);

    // return () => {
    //   second;
    // };
  }, []);

  return (
    <div>
      <div>
        <div>
          <h1>active projects being tracked</h1>
        </div>
      </div>
      <form>
        ________________________________________________________________________________________________________________________________________________________{" "}
        <br />
        <label>
          Track new board (enter board ID):{" "}
          <input
            type="text"
            onChange={(e) => setBoardIds(e.target.value)}
          ></input>
        </label>
        <button>submit</button>
      </form>
    </div>
  );
};

export default UserInput;
