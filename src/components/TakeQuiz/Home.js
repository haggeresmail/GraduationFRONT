import React from "react";
import { Link } from "react-router-dom";
import "./takequiz.css";
const Home = () => {
  return (
    <div className="container welcome_box">
      <div className="row box">
        <p>Welcome to Quiz</p>
        <Link to="/questions">
          <button className="startquiz" >Start the Quiz</button>
        </Link>
        {/* <Link to="/CourseMaterials">
          <button  className="startquiz">CourseMaterials</button>
        </Link> */}
        {/* <Link to="/Upload">
          <button className="startquiz">Upload</button>
        </Link> */}
        <Link to="/takeAssignment">
          <button className="startquiz">takeAssignment</button>
        </Link>
        {/* <Link to="/addannouncment">
          <button className="startquiz">add announcment</button>
        </Link> */}
        <Link to="/announcment">
          <button className="startquiz">announcments</button>
        </Link>
      </div>
    </div>
  ); 
};
export default Home;