
//Archivo base de las rutas de la aplicación


module.exports = app => {
  //Colocamos todas las rutas a /api/proveedores para usar las rutas de los proveedores
  app.use("/api/proveedores"  , require('./proveedores.routes'));
  //Lo mismo para la autentificación
  app.use('/api/auth/'        , require('./auth.routes'));
  //Lo mismo para coger los usuarios y toda la pesca
  app.use('/api/users/'       , require('./auth.routes'));

};
