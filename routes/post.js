var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

//Models
var Post = require('../models/Post.js');

var db = mongoose.connection; //para las conexiones a las bbdd

/* GET posts listing ordered by publicationdate. */ 
//traer y ordenar los POST por fecha de publicacion decreciente
router.get('/', function (req, res) {
  Post.find().sort('-publicationdate').exec(function(err, posts) { //busqueda de post en la coleccion correspondiente
    if (err) res.status(500).send(err);
    else res.status(200).json(posts);
  });
});

/* GET all posts from an user by user Email */
router.get('/all/:email', function (req, res) {  //usuario identificado por su mail
  Post.find({'email':req.params.email}).sort('-publicationdate').exec(function (err, posts) { //le metes el parametro correspondiente al filtro de busqueda
      if (err) res.status(500).send(err);
      else res.status(200).json(posts);
    });
});

/* POST a new post*/  //post de un nuevo mensaje
router.post('/', function (req, res) { //haces un post de un mensaje particular
  Post.create(req.body, function (err, postinfo) {
    if (err) res.status(500).send(err); //si sale mal, error 500
    else res.sendStatus(200);
  });
});

/* PUT an existing post */
router.put('/:id', function (req, res) {  //hay que definir que mensaje o post quiero actualizar, para ello le pasas el id del mensaje
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, postinfo) { //buscamos ese post y lo actualizamos
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/* DELETE an existing post */
router.delete('/:id', function (req, res) {
  Post.findByIdAndDelete(req.params.id, function (err, postinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});


module.exports = router;
