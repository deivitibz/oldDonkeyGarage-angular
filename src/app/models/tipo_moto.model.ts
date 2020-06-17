export class Moto {
  id: number;
  tipo: string;
  anuncio_id: number;

  constructor(id: number, tipo: string, anuncio_id: number) {
    this.id = id;
    this.tipo = tipo;
    this.anuncio_id = anuncio_id;
  }
}
