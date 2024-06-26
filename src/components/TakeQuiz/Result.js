import React from "react";
import { Link } from "react-router-dom";
import question from "./question";
// import "./takequiz.css";

const Result = ({ answer }) => {
  function giveResult() {
    let cnt = 0;
    for (let i = 0; i < question.length; i++) {
      if (answer[i] === question[i].ans) cnt++;
    }
    return cnt;
  }

  return (
    <div className="container welcome_box">
      <div className="row box">
        {/* <h2>Congratulations</h2>
        <p>You scored {giveResult()} / {question.length}</p> */}
        <Link to="/">
          <button className="btn btn-success px-4 py-2 fw-bold">HOME</button>
        </Link>
        <Link to="/bank">
          <button className="btn btn-success px-4 py-2 fw-bold">Bank Test</button>
        </Link>
      </div>
    </div>
  );
};

export default Result;

