


// import React from "react";
// import Question from "./question";
// // import "./takequiz.css";

// const QuestionComp = ({ question, handleAnswer}) => {
//   const { title, options, id, type } = question;

//   return (
//     <div className="question">
//       <p className="fw-bold">Question No - {id + 1} / {Question.length}</p>
//       <p className="fw-bold">{title}</p>
//       {type === "mcq" ? (
//         <div>
//         <input type="radio" name="box" id="one" /> 
//         <input type="radio" name="box" id="two" /> 
//         <input type="radio" name="box" id="three" /> 
//         <input type="radio" name="box" id="four" /> 
//         <label htmlFor="one" className="box first" onClick={() => handleAnswer(id, 0)}> 
//            <div className="course"> <span className="circle" /> <span className="subject"> {options[0]} </span> </div> 
//          </label> 
//          <label htmlFor="two" className="box second" onClick={() => handleAnswer(id, 1)}> 
//            <div className="course"> <span className="circle" /> <span className="subject"> {options[1]} </span> </div> 
//          </label> 
//          <label htmlFor="three" className="box third" onClick={() => handleAnswer(id, 2)}> 
//            <div className="course"> <span className="circle" /> <span className="subject"> {options[2]} </span> </div> 
//          </label> 
//          <label htmlFor="four" className="box forth" onClick={() => handleAnswer(id, 3)}> 
//            <div className="course"> <span className="circle" /> <span className="subject"> {options[3]} </span> </div> 
//          </label>
//         </div>
//       ) : (
//         <div>
//           <textarea className="textareaquiz"
//             name={`essay-${id}`}
//             id={`essay-${id}`}
//             rows="4"
//             cols="50"
//             onBlur={(e) => handleAnswer(id, e.target.value)}
//             placeholder="Write your answer here..."
//           ></textarea>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionComp;
//************************************************************************************************** */

// import React from "react";
// // import "./takequiz.css";

// const QuestionComp = ({ question, handleAnswer }) => {
//   const { title, options, id, type } = question;

//   return (
//     <div className="question">
//       <p className="fw-bold">Question No - {id + 1}</p>
//       <p className="fw-bold">{title}</p>
//       {type === "mcq" ? (
//         <div>
//           {options.map((option, index) => (
//             <label key={index} className="box" onClick={() => handleAnswer(id, index)}>
//               <div className="course">
//                 <span className="circle" /> <span className="subject">{option}</span>
//               </div>
//             </label>
//           ))}
//         </div>
//       ) : (
//         <div>
//           <textarea
//             className="textareaquiz"
//             name={`essay-${id}`}
//             id={`essay-${id}`}
//             rows="4"
//             cols="50"
//             onBlur={(e) => handleAnswer(id, e.target.value)}
//             placeholder="Write your answer here..."
//           ></textarea>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionComp;

//************************************************************************************************** */
import React from "react";

const QuestionComp = ({ question, handleAnswer }) => {
  const { questionText, choiceA, choiceB, choiceC, choiceD, type } = question;

  return (
    <div className="question">
      <p className="fw-bold">Question: {questionText}</p>
      {type === "mcq" ? (
        <div>
          <label className="box" onClick={() => handleAnswer(question.questionId, "A")}>
            <div className="course">
              <span className="circle" /> <span className="subject">{choiceA}</span>
            </div>
          </label>
          <label className="box" onClick={() => handleAnswer(question.questionId, "B")}>
            <div className="course">
              <span className="circle" /> <span className="subject">{choiceB}</span>
            </div>
          </label>
          <label className="box" onClick={() => handleAnswer(question.questionId, "C")}>
            <div className="course">
              <span className="circle" /> <span className="subject">{choiceC}</span>
            </div>
          </label>
          <label className="box" onClick={() => handleAnswer(question.questionId, "D")}>
            <div className="course">
              <span className="circle" /> <span className="subject">{choiceD}</span>
            </div>
          </label>
        </div>
      ) : (
        <div>
          <textarea
            className="textareaquiz"
            name={`essay-${question.questionId}`}
            id={`essay-${question.questionId}`}
            rows="4"
            cols="50"
            onBlur={(e) => handleAnswer(question.questionId, e.target.value)}
            placeholder="Write your answer here..."
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default QuestionComp;
