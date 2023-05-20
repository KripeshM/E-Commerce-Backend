// To define routes for client request, Create routes folder and router.js file 

//-->import express
 const express=require('express')

//import product controller
 const productController=require('../controllers/productController')

 //import wishlist controller
 const wishlistController=require('../controllers/wishlistController')

 //import cart controller
 const cartController=require('../controllers/cartController')

//-->using express create an object for router class inorder to setup path
const router=new express.Router()

//-->resolving client requests
    //api - getallproducts request

router.get('/products/all-products',productController.getallproducts)

//api - get particular product
router.get('/products/view-product/:id',productController.viewProduct)

//api - add product to wishlist 
router.post('/wishlist/add-to-wishlist',wishlistController.addtowishlist)

//api - get wishlist products
router.get('/wishlist/get-wishlist',wishlistController.getwishlistitems)

//api - remove wishlist item
router.delete('/wishlist/remove-wishlist-item/:id',wishlistController.removewishlistitems)

//api - add to cart
router.post('/cart/add-to-cart',cartController.addtocart)

//api - get cart items
router.get('/cart/get-cart',cartController.getcartdata)

//api  - remove from cart
router.delete('/cart/remove-cart-item/:id',cartController.removefromcart)

//api - increment cart quantity
router.get('/cart/increment-count/:id',cartController.incrementcount)

//api - decrement cart quantity
router.get('/cart/decrement-count/:id',cartController.decrementcount)

//export router
module.exports=router
