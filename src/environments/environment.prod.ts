export const environment = {
  production: true,
  apiGatewayBase: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',

  productos: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/producto/all',
      obtenerActivos: '/producto/all/activo',
      obtenerPorId: '/producto/',
      crear: '/producto',
      actualizar: '/producto/',
      cambiarEstado: '/producto/',
      eliminar: '/producto/'
    }
  },

  solicitudes: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/solicitud/all',
      obtenerActivos: '/solicitud/all/activo',
      obtenerPorId: '/solicitud/',
      crear: '/solicitud',
      actualizar: '/solicitud/',
      cambiarEstado: '/solicitud/',
      eliminar: '/solicitud/'
    }
  },

  tipoProductos: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/producto/tipo/all',
      obtenerPorId: '/producto/tipo/',
      crear: '/producto/tipo',
      actualizar: '/producto/tipo/',
      cambiarEstado: '/producto/tipo/',
      eliminar: '/producto/tipo/'
    }
  },

  materiales: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/material',
      obtenerPorId: '/material/',
      crear: '/material',
      actualizar: '/material/',
      cambiarEstado: '/material/',
      eliminar: '/material/'
    }
  },

  expositor: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/expositor'
    }
  },

  imagenes: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/s3',
    endpoints: {
      obtenerTodos: '/bucketdyc/object',
      obtenerStreamPorKey: '/bucketdyc/object/stream',
      obtenerPorKey: '/bucketdyc/object',
      crear: '/bucketdyc/object',
      mover: '/bucketdyc/move?sourceKey={source}&destKey={dest}',
      eliminar: '/bucketdyc/object'
    },
    directorios: {
      producto: 'producto/',
      servicio: 'servicio/',
      solicitud: 'solicitud/',
      tipoproducto: 'tipoproducto/',
    }
  },

  nombreBucket: 'bucketdyc',

  servicios: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/servicio/all',
      obtenerActivos: '/servicio/activos',
      obtenerPorId: '/servicio/',          // +id
      crear: '/servicio',
      actualizar: '/servicio/',            // +id
      cambiarEstado: '/servicio/',         // +id + '/cambiar-estado?activo={valor}'
      eliminar: '/servicio/'               // +id
    }
  }
};
