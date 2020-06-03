export class Constructor {
  id: number;
  nombre: string;
  usuario: string;
  password: string;
  email: string;
  cif: string;
  direccion: string;
  provincia: string;
  localidad: string;
  telefono: number;
  persona_contacto: string;
  imagen: string;

  constructor(
    id: number,
    nombre: string,
    usuario: string,
    password: string,
    email: string,
    cif: string,
    direccion: string,
    provincia: string,
    localidad: string,
    telefono: number,
    persona_contacto: string,
    imagen: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.usuario = usuario;
    this.password = password;
    this.email = email;
    this.cif = cif;
    this.direccion = direccion;
    this.provincia = provincia;
    this.localidad = localidad;
    this.telefono = telefono;
    this.persona_contacto = persona_contacto;
    this.imagen = imagen;
  }
}
