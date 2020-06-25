export class Imagenes {
  originalName: string;
  mimetype: string;
  filename: string;
  path: string;
  size: number;
  id_usuario: number;
  id_anuncio: number;
  id_noticia: number;

  constructor(originalName: string,mimetype: string,filename: string,path: string,size: number,id_usuario: number,id_anuncio: number,id_noticia: number) {
    this.originalName = originalName;
    this.mimetype = mimetype;
    this.filename = filename;
    this.path = path;
    this.size = size;
    this.id_usuario = id_usuario;
    this.id_anuncio = id_anuncio;
    this.id_noticia = id_noticia;

  }

}
