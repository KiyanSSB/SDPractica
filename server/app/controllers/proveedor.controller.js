const db = require("../models");
const Proveedor = db.proveedores;

// Crea y guarda Proveedor
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Proveedor
  const proveedor = new Proveedor({
    name: req.body.name,
    aviones: req.body.aviones,
  });

  // Save Proveedor in the database
  proveedor
    .save(proveedor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Proveedor."
      });
    });
};

//Devuelve todos los proveedores de la base de datos
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Proveedor.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error recuperando los proveedores."
      });
    });
};

//Encuentra un proveedor mediante un id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Proveedor.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No se ha encontrado un Proveedor con id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error recuperando Proveedor con id=" + id });
    });
};

//Update mediante id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "No se puede enviar el cuerpo sin datos!"
    });
  }

  const id = req.params.id;

  Proveedor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede updatear Proveedor with id=${id}.`
        });
      } else res.send({ message: "Proveedor updatead correctamente." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updateando Proveedor with id=" + id
      });
    });
};

//Delete mediante id
exports.delete = (req, res) => {
  const id = req.params.id;

  Proveedor.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Proveedor with id=${id}. Maybe Proveedor was not found!`
        });
      } else {
        res.send({
          message: "Proveedor was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Proveedor with id=" + id
      });
    });
};



