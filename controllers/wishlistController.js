//import wishlist collection
const wishlists = require('../models/wishlistSchema')
// const wishlist=require('../models/wishlistSchema')


//add to wishlist logic
exports.addtowishlist=async(req,res)=>{
    //get product details from request

    //using destructuring
    const {id,title,price,image}=req.body

    //logic
    try{
        //check if the product in the mongodb
        const item=await wishlists.findOne({id})
        if(item){
            res.status(403).json("Item already exist in wishlist")
        }
        else{
            //add the item into the wishlist
            const newProduct=new wishlists({id,title,price,image})
            //to store into the mongodb
            await newProduct.save()
            res.status(200).json("Product added to wishlist")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//get wishlist data - logic
exports.getwishlistitems=async(req,res)=>{
    //logic
    try{
        //get all wishlist items from mongodb
        const allwishlistitems=await wishlists.find()
        res.status(200).json(allwishlistitems)
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.removewishlistitems=async(req,res)=>{
    //get id from the request
    const {id}=req.params
    try{
        const removewishlistitem=await wishlists.deleteOne({id})
        if(removewishlistitem.deletedCount!=0){
            //get all wishlist item after removing particular wishlist item
            const allwishlists=await wishlists.find()//remaining wishlist item
            res.status(200).json(allwishlists)
        }
        else{
            res.status(404).json("Item not present")
        }
    }
    catch(error){
        res.status(401).json(error)
    }

}