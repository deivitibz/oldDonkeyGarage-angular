export class Noticia {
  id: number;
  titulo: string;
  imagen: string;
  descripcion: string;
  autor: string;
  categoria: string[];
  estado: boolean;

  constructor(
    id: number,
    titulo: string,
    imagen: string,
    descripcion: string,
    autor: string,
    categoria: string[],
    estado: boolean
  ) {
    this.id = id;
    this.titulo = titulo;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.autor = autor;
    this.categoria = categoria;
    this.estado = estado;
  }
}
