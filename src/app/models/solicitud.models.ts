import { TipoSolicitud } from "./tipo-solicitud.models";
import { EstadoSolicitud } from "./estado-solicitud.models";
import { Servicio } from "./servicio.model";

export interface Solicitud {
  idSolicitud: number;
  idTipoSolicitud: number;
  idEstadoSolicitud: number;
  idServicio?: number;
  fechaCreacion?: string;
  nombreCliente: string;
  correoCliente: string;
  telefonoCliente?: string;
  observaciones?: string;

  tipoSolicitud?: TipoSolicitud;
  estadoSolicitud?: EstadoSolicitud;
  servicio?: Servicio;
}
