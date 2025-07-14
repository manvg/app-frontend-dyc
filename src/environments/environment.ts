export const environment = {
  production: false,
  apiGatewayBase: '',

  productos: {
    api: 'http://localhost:8080',
    endpoints: {
      obtenerTodos: '/api/productos',
      obtenerActivos: '/api/productos/activos',
      obtenerPorId: '/api/productos/',         // +id
      crear: '/api/productos',
      actualizar: '/api/productos/',           // +id
      cambiarEstado: '/api/productos/',        // +id + '/cambiar-estado?activo={valor}'
      eliminar: '/api/productos/'              // +id
    }
  },

  solicitudes: {
    api: 'http://localhost:8081',
    endpoints: {
      obtenerTodos: '/api/solicitudes',
      obtenerActivos: '/api/solicitudes/activos',
      obtenerPorId: '/api/solicitudes/',        // +id
      crear: '/api/solicitudes',
      actualizar: '/api/solicitudes/',          // +id
      cambiarEstado: '/api/solicitudes/',       // +id + '/cambiar-estado?activo={valor}'
      eliminar: '/api/solicitudes/',             // +id
      obtenerEstados: '/api/solicitudes/estados'
    }
  },

  tipoProductos: {
    api: 'http://localhost:8080',
    endpoints: {
      obtenerTodos: '/api/productos/tipos',
      obtenerPorId: '/api/productos/tipos/',     // +id
      crear: '/api/productos/tipos',
      actualizar: '/api/productos/tipos/',       // +id
      cambiarEstado: '/api/productos/tipos/',    // +id + '/cambiar-estado?activo={valor}'
      eliminar: '/api/productos/tipos/'          // +id
    }
  },

  materiales: {
    api: 'http://localhost:8080',
    endpoints: {
      obtenerTodos: '/api/materiales',
      obtenerPorId: '/api/materiales/',          // +id
      crear: '/api/materiales',
      actualizar: '/api/materiales/',            // +id
      cambiarEstado: '/api/materiales/',         // +id + '/cambiar-estado?activo={valor}'
      eliminar: '/api/materiales/'               // +id
    }
  },

  expositor: {
    api: 'http://localhost:8080',
    endpoints: {
      obtenerTodos: '/api/expositor'
    }
  },

  imagenes: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/s3',
    endpoints: {
      obtenerTodos: '/bucketdyc/object',
      obtenerStreamPorKey: '/bucketdyc/object/stream?key=',
      obtenerPorKey: '/bucketdyc/object?key=',
      crear: '/bucketdyc/object?key=',
      mover: '/bucketdyc/move?sourceKey={source}&destKey={dest}',
      eliminar: '/bucketdyc/object?key='
    },
    directorios: {
      producto: 'producto/',
      servicio: 'servicio/',
      solicitud: 'solicitud/',
      tipoproducto: 'tipoproducto/'
    }
  },

  bitacoras: {
    api: 'http://localhost:8081',
    endpoints: {
      obtenerTodos: '/api/solicitudes/bitacora/',
      obtenerPorId: '/api/solicitudes/bitacora/',// +id
      crear: '/api/solicitudes/bitacora',
      actualizar: '/api/solicitudes/bitacora/',// +id
      eliminar: '/api/solicitudes/bitacora/'// +id
    }
  },

  nombreBucket: 'bucketdyc',

  servicios: {
    api: 'http://localhost:8080',
    endpoints: {
      obtenerTodos: '/api/servicios',
      obtenerActivos: '/api/servicios/activos',
      obtenerPorId: '/api/servicios/',          // +id
      crear: '/api/servicios',
      actualizar: '/api/servicios/',            // +id
      cambiarEstado: '/api/servicios/',         // +id + '/cambiar-estado?activo={valor}'
      eliminar: '/api/servicios/'               // +id
    }
  }
};
