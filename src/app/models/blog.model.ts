

export class Blog {

    titulo: string;
    descripcion: string;
    autor: string;
    categoria: string;
    imagen: string;
    estado: boolean;
    fecha: number;






    constructor(pTitulo: string, pDescripcion: string, pAutor: string, pCategoria: string, pImagen: string, pEstado: boolean, pFecha: number) {
        this.titulo = pTitulo;
        this.descripcion = pDescripcion;
        this.autor = pAutor;
        this.imagen = pImagen;
        this.fecha = pFecha;
        this.categoria = pCategoria;
        this.estado = pEstado;
    }

}  //id titulo descripcion autor categoria imagen estado fecha_publicacion