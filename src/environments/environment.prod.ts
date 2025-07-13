export const environment = {
  production: true,
  apiGatewayBase: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',

  productos: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/producto/all',
      obtenerActivos: '/producto/activos',
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
      obtenerTodos: '/solicitud/all'
    }
  },

  tipoProductos: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/producto/tipo/all'
    }
  },

  materiales: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/material'
    }
  },

  expositor: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com',
    endpoints: {
      obtenerTodos: '/expositor'
    }
  },

  imagenes: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/s3'
  },

  nombreBucket: 'bucketdyc'
};
