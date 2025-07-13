export interface SolicitudImagen {
  idSolicitudImagen?: number;
  idSolicitud: number;
  nombre: string;
  extension: string;
  descripcion?: string;
  urlImagen?: string;
  activo?: number;
}
