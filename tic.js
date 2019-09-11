
var baseState = function () {
  return [null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null, null, null, null, null, null,
  null, null, null, null, null]
};
var historyState = [];
var currentState, turn;


/**Check if there is a winner */

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

  var isWinner = wins.filter(function(win) {
    return (currentState[win[0]] && currentState[win[0]] === currentState[win[1]] && currentState[win[0]] === currentState[win[2]]);
  });
  
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


  }
}
