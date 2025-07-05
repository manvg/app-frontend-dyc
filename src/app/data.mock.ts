import { Servicio } from "./models/servicio.model";
import { Producto } from "./models/producto.model";

export const SERVICIOS_MOCK: Servicio[] = [
  {
    idServicio: 1,
    nombre: 'Corte Láser de Acrílico',
    descripcion: 'Servicio de corte de acrílico de alta precisión para proyectos industriales y personalizados.',
    precio: 12000,
    urlImagen: 'assets/servicio_corte_laser_de_acrilico.jpg',
    activo: 1
  },
  {
    idServicio: 2,
    nombre: 'Grabado Láser en Madera',
    descripcion: 'Grabado de alta definición en madera para personalizar artículos y regalos.',
    precio: 9500,
    urlImagen: 'assets/servicio_grabado_laser_en_madera.jpg',
    activo: 1
  },
  {
    idServicio: 3,
    nombre: 'Corte Láser de MDF',
    descripcion: 'Corte preciso en MDF, ideal para maquetas, decoración y señalética.',
    precio: 10500,
    urlImagen: 'assets/servicio_corte_laser_de_MDF.jpg',
    activo: 1
  }
];

export const PRODUCTOS_MOCK: Producto[] = [
  {
    idProducto: 1,
    nombre: 'Letrero Luminoso Personalizado',
    descripcion: 'Letrero en acrílico con corte láser e iluminación LED, personalizable para tu negocio.',
    material: 'Acrílico',
    medidas: '60x30 cm',
    precio: 35000,
    urlImagen: 'assets/producto_letrero_negocio.jpg',
    activo: 1,
    idTipoProducto: 1,
    nombreTipoProducto: 'Letreros'
  },
  {
    idProducto: 2,
    nombre: 'Medalla Personalizada en Acrílico',
    descripcion: 'Medalla en acrílico cortada y grabada con láser, ideal para premiaciones deportivas o escolares.',
    material: 'Acrílico',
    medidas: '7x7 cm',
    precio: 4500,
    urlImagen: 'assets/producto_premio_medalla.jpg',
    activo: 1,
    idTipoProducto: 2,
    nombreTipoProducto: 'Premios'
  },
  {
    idProducto: 3,
    nombre: 'Señalética de Oficina',
    descripcion: 'Placa señalética acrílica con impresión o grabado láser, resistente y de alta calidad.',
    material: 'Acrílico',
    medidas: '20x10 cm',
    precio: 6500,
    urlImagen: 'assets/producto_senaletica_oficina.jpg',
    activo: 1,
    idTipoProducto: 3,
    nombreTipoProducto: 'Señalética'
  }
];
