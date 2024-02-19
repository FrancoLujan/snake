import { Fruta } from "./fruta.js";
const puntajes = document.querySelectorAll("p");
const canvas = document.querySelector("canvas");
const modal = document.querySelector(".perdisteInvisible");
let puntos = 0;
let maximoPuntaje = 0;

let banderaDerrota = false;

let d;

let snake = [{ x: 250, y: 250 }];
let fruta = new Fruta();

let lapiz = canvas.getContext("2d");

function perdiste(clase) {
  modal.setAttribute("class", clase);
}

function colicionMapa(x, y) {
  if (x >= 510 || y >= 510 || x < 0 || y < 0) {
    banderaDerrota = true;
    perdiste("perdisteVisible");
    if (puntos > maximoPuntaje) {
      maximoPuntaje = puntos;

      puntajes[1].textContent = `maxScore: ${maximoPuntaje}`;
    }
    if (banderaDerrota) {
      modal.addEventListener("click", (e) => {
        e.preventDefault();
        lapiz.clearRect(0, 0, 500, 500);
        perdiste("perdisteInvisible");
        snake[0].x = 250;
        snake[0].y = 250;
        snake = snake.filter((elemento, i) => i == 0);
        fruta = new Fruta();
        banderaDerrota = false;
        puntos = 0;
        puntajes[0].textContent = `score: ${puntos}`;
      });
    }
  }
}

window.addEventListener("keydown", (e) => {
  let direcion = e.key;
  if ((direcion == "ArrowUp" || direcion == "w") && d !== "abajo") {
    d = "arriba";
  } else if ((direcion == "ArrowDown" || direcion == "s") && d !== "arriba") {
    d = "abajo";
  } else if (
    (direcion == "ArrowRight" || direcion == "d") &&
    d !== "izquierda"
  ) {
    d = "derecha";
  } else if ((direcion == "ArrowLeft" || direcion == "a") && d !== "derecha") {
    d = "izquierda";
  }
});

function dibujo() {
  colicionMapa(snake[0].x, snake[0].y);
  snake.forEach((segmento) => {
    lapiz.fillStyle = "rgb(0, 203, 218)";
    lapiz.fillRect(segmento.x, segmento.y, 10, 10);
  });
  // fruta
  lapiz.fillStyle = "red";
  lapiz.fillRect(fruta.x, fruta.y, 10, 10);
  let cabezaX = snake[0].x;
  let cabezaY = snake[0].y;
  // movimiento
  if (d == "arriba") cabezaY -= 10;
  if (d == "abajo") cabezaY += 10;
  if (d == "derecha") cabezaX += 10;
  if (d == "izquierda") cabezaX -= 10;

  const parte = { x: cabezaX, y: cabezaY };
  //colicion con fruta
  if (cabezaX == fruta.x && cabezaY == fruta.y) {
    fruta = new Fruta();
    puntos += 1;
    puntajes[0].textContent = `score: ${puntos}`;

    for (let i of snake) {
      console.log(i);

      if (i.x == fruta.x && i.y == fruta.y) {
        fruta = new Fruta();
      }
    }
  } else {
    snake.pop();
  }

  snake.unshift(parte);
}

let juego = setInterval(() => {
  lapiz.clearRect(0, 0, 500, 500);
  dibujo();
}, 60);
