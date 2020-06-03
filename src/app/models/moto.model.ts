export class Moto {
  id: number;
  marca: string;
  modelo: string;
  color: string;
  cilindrada: number;

  constructor(
    id: number,
    marca: string,
    modelo: string,
    color: string,
    cilindrada: number
  ) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.cilindrada = cilindrada;
  }
}
