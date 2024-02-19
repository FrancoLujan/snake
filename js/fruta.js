export class Fruta {
  constructor() {
    this.x = this.limites(Math.floor(Math.random() * 11) * 50);
    this.y = this.limites(Math.floor(Math.random() * 11) * 50);
  }
  limites(ubicacion) {
    return ubicacion == 500 ? ubicacion - 10 : ubicacion;
  }
}
