export interface AnuncioInterface {
  $key?: string;
  id: number | string;
  titulo: string;
  descripcion: string;
  km: string | number;
  year: string | number;
  provincia: string;
  poblacion: string;
  itv: boolean;
  homologacion: boolean;
  fecha_publicacion: string;
  precio: number | string;
  marca: string;
  modelo: string;
  tipo: string;
  usuarios_id?: string;
  imagen_id?: string
}

export interface UsuarioInterface{
  username: string;
  email: string;
  password: string;
}
