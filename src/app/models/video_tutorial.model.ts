export class Video_tutorial {
  id: number;
  titulo: string;
  descripcion: string;
  autor: string;
  categoria: string[];
  url_video: string;
  premium: boolean;

  constructor(
    id: number,
    titulo: string,
    descripcion: string,
    autor: string,
    categoria: string[],
    url_video: string,
    premium: boolean
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.autor = autor;
    this.categoria = categoria;
    this.url_video = url_video;
    this.premium = premium;
  }
}
