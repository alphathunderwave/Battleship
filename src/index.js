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
    for (let index = 1; index < 6; index++) {
      this.ships.push(new Ship(sizeList[index - 1]));
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

function startGame(player) {
  //player setup
  var p1 = new Player();
  p1.placeShip(0, [0, 5], 0);
  p1.placeShip(1, [1, 5], 0);
  p1.placeShip(2, [2, 5], 0);
  p1.placeShip(3, [3, 5], 0);
  p1.placeShip(4, [4, 5], 0);
  console.log(p1);
  var p2 = new Player()
  for (let i = 0; i < 5; i++) {
    var complete = true 
    while (complete) {
      var r1 = Math.floor(Math.random() *10)
      var r2 = Math.floor(Math.random() *10)
      var r3 = Math.round(Math.random() *1)
      if(p2.placeShip(i,[r1,r2],r3)){
        complete = false
      }
    }
  }
  console.log(p2)
  //combat
}
startGame();
