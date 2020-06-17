export class Video_tutorial {
  id: number;
  titulo: string;
  descripcion: string;
  autor: string;
  categoria: string[];
  url_video: string;
  premium: boolean;
  fecha_publicacion: string;
  usuarios_id: number;

  constructor(
    id: number,
    titulo: string,
    descripcion: string,
    autor: string,
    categoria: string[],
    url_video: string,
    premium: boolean,
    fecha_publicacion: string,
    usuarios_id: number
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.autor = autor;
    this.categoria = categoria;
    this.url_video = url_video;
    this.premium = premium;
    this.fecha_publicacion = fecha_publicacion;
    this.usuarios_id = usuarios_id;
  }
}
