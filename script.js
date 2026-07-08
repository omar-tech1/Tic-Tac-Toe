let CurrentPlayer = "X";
const Num_OF_Rows = 4;
const trying = Num_OF_Rows ** 2;
let tryingCounter = 0;


const resetElement = document.querySelector("#reset");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");

const createBoardArray = () => {
  let board = [];
  for (let row = 0; row < Num_OF_Rows; row++) {
    board.push(Array.from({ length: Num_OF_Rows }, () => "_"));
  }
  return board;
};
let board = createBoardArray();

const checkRows = () => {
  let column = 0;
  for (let row = 0; row < Num_OF_Rows; row++) {
    while (column < Num_OF_Rows) {
      if (board[row][column] !== CurrentPlayer) {
        column = 0;
        break;
      }
      column++;
    }
    if (column == Num_OF_Rows) {
      return true;
    }
  }
};
const checkColumn = () => {
  let row = 0;
  for (let column = 0; column < Num_OF_Rows; column++) {
    while (row < Num_OF_Rows) {
      if (board[row][column] !== CurrentPlayer) {
        row = 0;
        break;
      }
      row++;
    }
    if (row == Num_OF_Rows) {
      return true;
    }
  }
};
const checkDiagonals = () => {
  let cont = 0;
  while (cont < Num_OF_Rows) {
    if (board[cont][cont] !== CurrentPlayer) {
      cont = 0;
      break;
    }
    cont++;
  }
  if (cont == Num_OF_Rows) {
    return true;
  }
};
const checkDiagonalsRevers = () => {
  let cont = 0;
  while (cont < Num_OF_Rows) {
    if (board[cont][Num_OF_Rows - cont - 1] !== CurrentPlayer) {
      cont = 0;
      break;
    }
    cont++;
  }
  if (cont == Num_OF_Rows) {
    return true;
  }
};

const checkWin = (CurrentPlayer) => {
  if (checkRows(CurrentPlayer)) {
    return true;
  }
  if (checkColumn(CurrentPlayer)) {
    return true;
  }
  if (checkDiagonals(CurrentPlayer)) {
    return true;
  }
  if (checkDiagonalsRevers(CurrentPlayer)) {
    return true;
  }
};
const resetBoard = () => {
  document.querySelector(".board").remove();
  board =createBoardArray();
  CurrentPlayer = "X";
  tryingCounter = 0;
  createBoard();
};
const runWinEvent = (CurrentPlayer) => {
  setTimeout(() => {
    winSound.play();
    winSound.onended = () => {
      alert(`Player ${CurrentPlayer} Won !`);
      resetBoard();
    };
  }, 50);
};

const runDrawEvent = () => {
  setTimeout(() => {
    drawSound.play();
    drawSound.onended = () => {
      alert("Draw!!");
      resetBoard();
    };
  }, 100);
};

const clickBottomHandler = (event, index) => {
  const cell = event.target;

  const row = Math.floor(index / Num_OF_Rows);
  const col = index % Num_OF_Rows;
  // console.log({row});
  // console.log({col});
  if (board[row][col] === "_") {
    tryingCounter++;
    board[row][col] = CurrentPlayer;
    cell.querySelector(".value").textContent = CurrentPlayer;
    cell.classList.add(`cell--${CurrentPlayer}`);
  }
  if (checkWin(CurrentPlayer)) {
    runWinEvent(CurrentPlayer);
  } else {
    if (tryingCounter === trying) {
      runDrawEvent();
    }
  }
  CurrentPlayer = CurrentPlayer === "X" ? "O" : "X";
};

const createBoard = () => {
  const container = document.querySelector(".container");
  const board = document.createElement("div");

  board.classList.add("board");
  for (let i = 0; i < Num_OF_Rows ** 2; i++) {
    const cellElementString = `<div class="cell" role="button" tabindex="${i+1}" ><span class="value"></span></div>`;
    const cellElement = document
      .createRange()
      .createContextualFragment(cellElementString);

    cellElement.querySelector(".cell").onclick = (event) =>
      clickBottomHandler(event, i);
    cellElement.querySelector(".cell").onkeydown = (event) =>
     event.key==="Enter"? clickBottomHandler(event, i):true;
    board.appendChild(cellElement);
    document.documentElement.style.setProperty("--grid-rows", Num_OF_Rows);
  }
  container.insertAdjacentElement("afterbegin", board);
};
resetElement.addEventListener("click", resetBoard);

createBoard();
