const express = require('express');
const router = express.Router();

//Importación de los controllers 

const authCtrl = require('../controllers/auth.controller') 

router.post('/signup'   , authCtrl.signUp )
router.post('/signin'   , authCtrl.signIn )

module.exports = router;
