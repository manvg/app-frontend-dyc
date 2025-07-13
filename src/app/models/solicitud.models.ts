import { TipoSolicitud } from "./tipo-solicitud.models";
import { EstadoSolicitud } from "./estado-solicitud.models";
import { Servicio } from "./servicio.model";
import { SolicitudProducto } from "./solicitud-producto.model";
import { SolicitudImagen } from "./solicitud-imagen.model";

export interface Solicitud {
  idSolicitud?: number;
  idTipoSolicitud: number;
  nombreTipoSolicitud?: string;
  idEstadoSolicitud: number;
  nombreEstadoSolicitud?: string;
  idServicio?: number | null;
  nombreServicio?: string | null;

  fechaCreacion?: string;
  nombreCliente: string;
  correoCliente: string;
  telefonoCliente?: string;
  observaciones?: string;

  productos?: SolicitudProducto[];
  imagenes?: SolicitudImagen[];
  tipoSolicitud?: TipoSolicitud;
  estadoSolicitud?: EstadoSolicitud;
  servicio?: Servicio;
}
