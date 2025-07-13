export const environment = {
  production: false,
  apiGatewayBase: '',

  productos: {
    api: 'http://localhost:8080',
    endpoints: {
      obtenerTodos: '/api/productos',
      obtenerActivos: '/api/productos/activos',
      obtenerPorId: '/api/productos/',
      crear: '/api/productos',
      actualizar: '/api/productos/',
      cambiarEstado: '/api/productos/',
      eliminar: '/api/productos/'
    }
  },

  solicitudes: {
    api: 'http://localhost:8081',
    endpoints: {
      obtenerTodos: '/api/solicitudes'
    }
  },

  tipoProductos: {
    api: 'http://localhost:8080',
    endpoints: {
      obtenerTodos: '/api/productos/tipos'
    }
  },

  materiales: {
    api: 'http://localhost:8080',
    endpoints: {
      obtenerTodos: '/api/materiales'
    }
  },

  expositor: {
    api: 'http://localhost:8080',
    endpoints: {
      obtenerTodos: '/api/expositor'
    }
  },

  imagenes: {
    api: 'https://xa8hsg5wk6.execute-api.us-east-1.amazonaws.com/s3'
  },

  nombreBucket: 'bucketdyc'
};
