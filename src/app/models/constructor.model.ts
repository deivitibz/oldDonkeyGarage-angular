export class Constructor {
  id: number;
  nombre: string;
  email: string;
  direccion: string;
  provincia: string;
  localidad: string;
  telefono: number;
  persona_contacto: string;
  imagen: string;
  descripcion: string;

  constructor(
    id: number,
    nombre: string,
    email: string,
    direccion: string,
    provincia: string,
    localidad: string,
    telefono: number,
    persona_contacto: string,
    imagen: string,
    descripcion: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.direccion = direccion;
    this.provincia = provincia;
    this.localidad = localidad;
    this.telefono = telefono;
    this.persona_contacto = persona_contacto;
    this.imagen = imagen;
    this.descripcion = descripcion;
  }
}
