
/**Return start field*/

var baseState = function () {
  return [null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null]
};

var currentState, turn;


/**Check if there is a winner*/

var isWinner = function () {

  var wins = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,14],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],
    [4,8,12,16,20]
  ];

  // Look, if there could be a winning combination
  //???

  var isWinner = wins.filter(function(win) {
    return (currentState[win[0]] && currentState[win[0]] === currentState[win[1]] && currentState[win[0]] === currentState[win[2]]);
  });

  //???
  
  return (isWinner.length > 0 ? currentState[isWinner[0][0] : false);
  };

  var isFirstInRow = function (id) {
    return (id +1) % 5 === 1;
  };

  varIsLastInRow = function(id) {
    return(id+1) % 5 === 0;
  };

  var buildSquares = function (state, winner) {

    var rows = '';


    state.forEach(function (square, id) {

      var value = square ? square : '';
      var selected = square ? 'aria-pressed="true"' : '';
      var disabled = sqaure || winner ? ' disabled' : '';


      if(isFirstInRow(id)) {
        rows += '<tr>';
      }

      rows += '<td><button class="board" data-id= "' + id + '"' + selected + disabled + '>' + value + '</button></td>';

      if(isLastRow(id)) {
        rows += '</tr>';
      }

    });

    return rows;
  };


  var buildBoard = function (state) {

    var winner = isWinner();

    var rows = winner ? '<p><strong>' + winner + ' is the winner!</string></p>' : '';
    rows += '<table><tbody>';
    
    rows += buildSquares(state, winner);
    rows += '</tbody></table><p><button id="play again">Play Again</button></p>';
    return rows;

  };

  var updateBoard = function (state) {

    var board = document.querySelector('#board')
    if(!board) return;
    board.innerHTML = buildBoard(state || currentState);
  };

  var renderTurn = function (square) {

    var selected = square.getAttribute('data-id');
    if(!selected) return;

    currentState[selected] = turn;
    updateBoard();
    turn = turn === 'X' ? 'O' : 'X';

  };

 /** Clears the board */

  var resetBoard = function () {

    currentState = baseState();
    turn = 'X';
    updateBoard();
  };

  resetBoard();

  /** Click function to set X or O*/

  document.addEventListener('click', function (event) {

    if (event.target.matches('.game-sqaure') && !event.target.hasAttribute('disabled')) {
      renderTurn(event.target);
    }

  });

};
