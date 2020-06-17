export class Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  autor: string;
  categoria: string[];
  imagen: string;
  estado: boolean;
  fecha_publicacion: string;
  usuarios_id: number;

  constructor(
    id: number,
    titulo: string,
    descripcion: string,
    autor: string,
    categoria: string[],
    imagen: string,
    estado: boolean,
    fecha_publicacion: string,
    usuarios_id: number
  ) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.autor = autor;
    this.categoria = categoria;
    this.imagen = imagen;
    this.estado = estado;
    this.fecha_publicacion = fecha_publicacion;
    this.usuarios_id = usuarios_id;
  }
}
