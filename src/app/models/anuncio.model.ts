export class Anuncio {
  id: number;
  usuario: string;
  titulo: string;
  imagenes: string[];
  descripcion: string;
  km: string;
  year: string;
  tipo_moto: string[];
  provincia: string;
  precio: number;
  itv: boolean;
  homologacion: boolean;

  constructor(
    id: number,
    usuario: string,
    titulo: string,
    imagenes: string[],
    descripcion: string,
    km: string,
    year: string,
    tipo_moto: string[],
    provincia: string,
    precio: number,
    itv: boolean,
    homologacion: boolean
  ) {
    this.id = id;
    this.usuario = usuario;
    this.titulo = titulo;
    this.imagenes = imagenes;
    this.descripcion = descripcion;
    this.km = km;
    this.year = year;
    this.tipo_moto = tipo_moto;
    this.provincia = provincia;
    this.precio = precio;
    this.itv = itv;
    this.homologacion = homologacion;
  }
}
