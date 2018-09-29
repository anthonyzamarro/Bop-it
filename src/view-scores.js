// import React, {Component} from 'react';

// class ViewScores extends Component {
//   render() {
//     const listScores = Object.keys(localStorage).map((key, index) => {
//       // console.log(JSON.parse(localStorage[key]))
//       let names = JSON.parse(localStorage[key]).userName;
//       let scores = JSON.parse(localStorage[key]).userScore;
//       let dates = JSON.parse(localStorage[key]).currentDate;
//       return (
//        <li key={index}> name: {names}, score: {scores}, date: {dates}</li>
//       );
//     });
//     return (
//      <div className="score-card-container">
//         <div className="score-card">
//           <ul>{listScores.length > 0 ? listScores : "No games have been played yet!"}</ul>
//         </div>
//       </div>
//     )
//   }
// }

// export default ViewScores;
