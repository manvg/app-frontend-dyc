export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  idMaterial: number;
  nombreMaterial: string;
  medidas: string;
  precio: number;
  urlImagen: string;
  activo: number;
  idTipoProducto: number | null;
  nombreTipoProducto?: string;
}
