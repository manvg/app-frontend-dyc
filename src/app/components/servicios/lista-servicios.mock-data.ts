import { Servicio } from "../../models/servicio.model";

export const SERVICIOS_MOCK: Servicio[] = [
  {
    idServicio: 1,
    nombre: 'Corte Láser de Acrílico',
    descripcion: 'Corte preciso de acrílico para proyectos industriales, personalizados y decoración.',
    precio: 12000,
    urlImagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
    activo: 1,
  },
  {
    idServicio: 2,
    nombre: 'Grabado Láser en Madera',
    descripcion: 'Personaliza tus productos de madera con grabado láser de alta definición.',
    precio: 9000,
    urlImagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    activo: 1,
  },
  {
    idServicio: 3,
    nombre: 'Corte Láser de MDF',
    descripcion: 'Corte de piezas en MDF con detalles finos para maquetas y señalética.',
    precio: 8000,
    urlImagen: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
    activo: 1,
  },
];
