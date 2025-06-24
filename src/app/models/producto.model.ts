export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  material: string;
  medidas: string;
  precio: number;
  urlImagen: string;
  activo: number;
  idTipoProducto: number | null;
  nombreTipoProducto?: string;
}
