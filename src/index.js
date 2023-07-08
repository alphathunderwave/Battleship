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
  constructor(){
    this.gb = new Gameboard()
    this.ships = []
    var sizeList = [5,4,3,3,2]
    for (let index = 1; index < 6; index++) {
      this.ships.push(new Ship(sizeList[index-1]))
      
    }

  }
  placeShip(ship,pos,dir){
    if (dir){
      for (let i = 0; i < this.ships[ship].size; i++) {
        this.gb.board[pos[0]+i][pos[1]] = this.ships[ship]
      }
    }
    else{
      for (let i = 0; i < this.ships[ship].size; i++) {
        console.log(i)
        this.gb.board[pos[0]][pos[1]+i] = this.ships[ship]
      }

    }
  }
}


var p1 = new Player
p1.placeShip(0,[0,0],1)
p1.placeShip(1,[0,1],1)
p1.placeShip(2,[0,2],1)
p1.placeShip(3,[0,3],1)
p1.placeShip(4,[0,4],1)
console.log(p1)

