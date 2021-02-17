var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.MY_SECRET,
  userProperty: 'payload'
});


router.get('/', function(req, res, next) {
	res.send('API running!!');
});

// authentication
// Create Users
// 1. username, email
// 2. Login, Register APIs
// 3. only authenticated users (JWT) can add rating & comment to the product
// 4. authenticated users can not update the product only SUPER_ADMIN can.

var userPerm = require('../controller/auth');
router.post('/register', userPerm.register);
router.post('/login', userPerm.login);

//Create Product Rating/Comments API
// 1. I can see list of products with total comments, their count, along with rating
// 2. I can sort products with rating Highest to Lowest
var productRatingController = require('../controller/productRatingController');
router.get('/getProduct',productRatingController.getProduct)

// Create Products API - SUPER_ADMIN
// 1. name
// 2. description
// 3. only SUPER_ADMIN can post products
var productCreate = require('../controller/productCreate');
router.post('/createProduct',auth,productCreate.createProduct)


module.exports = router;

