export class Usuario {
  id: number;
  username: string;
  email: string;
  password: string;
  rol: string;
  nombre: string;
  apellidos: string;
  direccion: string;
  provincia: string;
  localidad: string;
  nombre_constructor: string;
  descripcion: string;
  persona_contacto: string;
  telefono: number;
  imagenes_usuario: string;
  imagenes_constructor: string;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    rol: string,
    nombre: string,
    apellidos: string,
    direccion: string,
    provincia: string,
    localidad: string,
    nombre_constructor: string,
    descripcion: string,
    persona_contacto: string,
    telefono: number,
    imagenes_usuario: string,
    imagenes_constructor: string
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.direccion = direccion;
    this.provincia = provincia;
    this.localidad = localidad;
    this.nombre_constructor = nombre_constructor;
    this.descripcion = descripcion;
    this.persona_contacto = persona_contacto;
    this.telefono = telefono;
    this.imagenes_usuario = imagenes_usuario;
    this.imagenes_constructor = imagenes_constructor;
  }
}
