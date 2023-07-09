import "./style.css";

const content = document.querySelector(".content");

class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    if (this.size == this.hits) {
      return true;
    } else return false;
  }
}

class Gameboard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = 0;
      }
    }
  }
}

class Player {
  constructor() {
    this.gb = new Gameboard();
    this.ships = [];
    var sizeList = [5, 4, 3, 3, 2];
    for (let index = 0; index < 5; index++) {
      this.ships.push(new Ship(sizeList[index]));
    }
  }
  checkPlace(ship, pos, dir) {
    try {
      if (dir) {
        if (this.ships[ship].size + pos[0] <= 10) {
          for (let i = 0; i < this.ships[ship].size; i++) {
            if (this.gb.board[pos[0] + i][pos[1]]) {
              return false;
            }
          }
        } else return false;
      } else {
        if (this.ships[ship].size + pos[1] <= 10) {
          for (let i = 0; i < this.ships[ship].size; i++) {
            if (this.gb.board[pos[0]][pos[1] + i]) {
              return false;
            }
          }
        } else return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  placeShip(ship, pos, dir) {
    if (this.checkPlace(ship, pos, dir)) {
      if (dir) {
        for (let i = 0; i < this.ships[ship].size; i++) {
          this.gb.board[pos[0] + i][pos[1]] = this.ships[ship];
        }
      } else {
        for (let i = 0; i < this.ships[ship].size; i++) {
          this.gb.board[pos[0]][pos[1] + i] = this.ships[ship];
        }
      }
      return true;
    } else return false;
  }
}

function show(player) {
  var count = 0;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const div = document.createElement("div");
      div.id = i.toString() + j.toString();
      if (player.gb.board[i][j]) {
        div.textContent = player.gb.board[i][j].size;
        div.classList.add("blue");
      } else div.textContent = player.gb.board[i][j];
      div.classList.add("sea");
      content.append(div);

      count++;
    }
  }
}

function startGame(player) {
  //player setup
  var p1 = new Player();
  p1.placeShip(0, [0, 5], 0);
  p1.placeShip(1, [1, 5], 0);
  p1.placeShip(2, [2, 5], 0);
  p1.placeShip(3, [3, 5], 0);
  p1.placeShip(4, [4, 5], 0);
  console.log(p1);
  var p2 = new Player();
  for (let i = 0; i < 5; i++) {
    var complete = true;
    while (complete) {
      var r1 = Math.floor(Math.random() * 10);
      var r2 = Math.floor(Math.random() * 10);
      var r3 = Math.round(Math.random() * 1);
      if (p2.placeShip(i, [r1, r2], r3)) {
        complete = false;
      }
    }
  }
  show(p2);
  console.log(p2);
  //combat
  var turn = 0;
  var p1t = [];
  var p2t = [];
  while (
    !(true &&
      p1.ships[0].isSunk() &&
      p1.ships[1].isSunk() &&
      p1.ships[2].isSunk() &&
      p1.ships[3].isSunk() &&
      p1.ships[4].isSunk()
    ) ||
    !(true &&
      p2.ships[0].isSunk() &&
      p2.ships[1].isSunk() &&
      p2.ships[2].isSunk() &&
      p2.ships[3].isSunk() &&
      p2.ships[4].isSunk()
    )
  ) {
    //p1
    if (turn) {
      console.log(p1t);
      var t = 1;
      while (t) {
        var c1 = Math.floor(Math.random() * 10);
        var c2 = Math.floor(Math.random() * 10);
        if (!p1t.includes(Number(c1.toString() + c2.toString()))) {
          t = !t;
          p1t.push(Number(c1.toString() + c2.toString()));
          if (p1.gb.board[c1][c2]) {
            p1.gb.board[c1][c2].hit();
          }
        }
      }
    }
    //p2
    else {
      var t = 1;
      while (t) {
        var c1 = Math.floor(Math.random() * 10);
        var c2 = Math.floor(Math.random() * 10);
        if (!p2t.includes(Number(c1.toString() + c2.toString()))) {
          t = !t;
          p2t.push(Number(c1.toString() + c2.toString()));
          document
          .getElementById(c1.toString() + c2.toString())
          .classList.add("strike");

          if (p2.gb.board[c1][c2]) {
            p2.gb.board[c1][c2].hit();
            document
              .getElementById(c1.toString() + c2.toString())
              .classList.add("red");
          }
        }
      }
    }
    turn = !turn;
  }
  if (turn) console.log("p2 wins");
  else console.log("p1 wins");
}
startGame();
