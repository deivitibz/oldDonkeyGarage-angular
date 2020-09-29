export class Anuncio {
  id: number;
  titulo: string;
  descripcion: string;
  km: string;
  year: string;
  provincia: string;
  poblacion: string;
  itv: boolean;
  homologacion: boolean;
  fecha_publicacion: string;
  precio: number;
  marca: string;
  modelo: string;
  usuarios_id: string;
  imagen_id: string;

  constructor(
    id: number,
    titulo: string,
    descripcion: string,
    km: string,
    year: string,
    provincia: string,
    poblacion: string,
    itv: boolean,
    homologacion: boolean,
    fecha_publicacion: string,
    precio: number,
    marca: string,
    modelo: string,
    usuarios_id: string,
    imagen_id: string
  ) {
    this.id = id;
    this.titulo = titulo;
    this.imagen_id = imagen_id
    this.descripcion = descripcion;
    this.km = km;
    this.year = year;
    this.provincia = provincia;
    this.poblacion = poblacion;
    this.itv = itv;
    this.homologacion = homologacion;
    this.fecha_publicacion = fecha_publicacion;
    this.precio = precio;
    this.marca = marca;
    this.modelo = modelo;
    this.usuarios_id = usuarios_id;
  }
}
