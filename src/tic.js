/**Return start field*/

var baseState = function() {
  return [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];
};

var currentState, turn;

/**Check if there is a winner*/

var isWinner = function() {
  var wins = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];

  // Look, if there could be a winning combination

  var isWinner = wins.filter(function(win) {
    return (
      currentState[win[0]] &&
      currentState[win[0]] === currentState[win[1]] &&
      currentState[win[0]] === currentState[win[2]] &&
      currentState[win[0]] === currentState[win[3]] &&
      currentState[win[0]] === currentState[win[4]]
    );
  });

  return isWinner.length > 0 ? currentState[isWinner[0][0]] : false;
};

/**
 * @param return id
 * Check first and last row */

var isFirstInRow = function(id) {
  if (id === 0 || id === 5 || id === 10 || id === 15 || id === 20) {
    return id;
  }
};

var isLastInRow = function(id) {
  if (id === 4 || id === 9 || id === 14 || id === 24) {
    return id;
  }
};

/** @param return the rows, to click on
 * Build the field*/

var buildSquares = function(state, winner) {
  var rows = "";

  /** Check how the partially field is marked */

  state.forEach(function(square, id) {
    var value = square ? square : "";
    var selected = square ? 'aria-pressed="true"' : "";
    var disabled = square || winner ? " disabled" : "";

    if (isFirstInRow(id)) {
      rows += "<tr>";
    }

    /** Click on the fields */

    rows +=
      '<td onclick="onCellClick()" id="cell-' +
      id +
      '"' +
      selected +
      disabled +
      ">" +
      value +
      "</td>";

    console.log("rows: ", rows);

    if (isLastInRow(id)) {
      rows += "</tr>";
    }
  });

  return rows;
};

/**Build the table and the play again button */

var buildBoard = function(state) {
  /*var winner = isWinner();

  //var rows = winner
  //? "<p><strong>" + winner + " is the winner!</string></p>"
  //: "";
  //alert(rows);
  var rows = "";
  rows += "<table><tbody>";

  rows += buildSquares(state, winner);
  rows += '</tbody></table><p><button id="play-again">Play Again</button></p>';

  return rows; */
};

/**Refresh the baord */

var updateBoard = function(state) {
  //debugger;
  var gameBoard = document.querySelector("#board");
  if (!gameBoard) return;
  gameBoard.innerHTML = buildBoard(state || currentState);
  var winner = isWinner();
  if (winner) alert(winner + " is the winner.");
};

/**Render 5x5 field */

var renderTurn = function(square) {
  var selected = square.getAttribute("data-id");
  if (!selected) return;

  currentState[selected] = turn;
  updateBoard();
  turn = turn === "X" ? "O" : "X";
};

/** Clears the board */

var resetBoard = function() {
  currentState = baseState();
  turn = "X";
  updateBoard();
};

//Recall function

resetBoard();
function onCellClick() {
  console.log("cell clicked");
}
/** Click function to set X or O*/
document.addEventListener(
  "click",
  function(event) {
    if (
      event.target.matches(".game-sqaure") &&
      !event.target.hasAttribute("disabled")
    ) {
      renderTurn(event.target);
    }

    /** Recall function for play again */

    if (event.target.matches("#play-again")) {
      resetBoard();
    }
  },
  false
);
