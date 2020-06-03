export class Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  usuario: string;
  password: string;
  email: string;
  direccion: string;
  provincia: string;
  localidad: string;
  telefono: number;
  imagen: string;

  constructor(
    id: number,
    nombre: string,
    apellidos: string,
    usuario: string,
    password: string,
    email: string,
    direccion: string,
    provincia: string,
    localidad: string,
    telefono: number,
    imagen: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.usuario = usuario;
    this.password = password;
    this.email = email;
    this.direccion = direccion;
    this.provincia = provincia;
    this.localidad = localidad;
    this.telefono = telefono;
    this.imagen = imagen;
  }
}
