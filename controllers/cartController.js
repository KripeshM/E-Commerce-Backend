//import cart collection

const carts=require('../models/cartSchema')

//add to cart
exports.addtocart=async(req,res)=>{
    //get product details from request
    const{id,title,price,image,quantity}=req.body

    //logic
    try{
        //check if the product is already in cart
        const product=await carts.findOne({id})
        if(product){
            //product is in cart,increment product quantity
            product.quantity+=1
            //update grand total in mongodb
            product.grandtotal=product.price*product.quantity;
            //to save changes in mongodb
            product.save()
            //send response to the client
            res.status(200).json("Product added to cart")
        }
        else{
            //product is not present in the cart
            //add product to the cart
            const newProduct=new carts({id,title,price,image,quantity,grandtotal:price})
            //save new product
            await newProduct.save()
            //send response to the client
            res.status(200).json("Product added to cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}


//get cart data
exports.getcartdata=async(req,res)=>{
    try{
        const allcartitems=await carts.find()
        res.status(200).json(allcartitems)
    }
    catch(error){
        res.status(401).json(error)
    }
}


//remove a product from cart
exports.removefromcart=async (req,res)=>{
    //get product id from request params
    const {id}=req.params
    try{
        //remove an item from cart
        const removedproduct=await carts.deleteOne({id})
        if(removedproduct.deletedCount!=0){
            //get remaining product
            const allcartitems=await carts.find()
            res.status(200).json(allcartitems)
        }
        else{
            res.status(404).json("Item not present")
        }
    }
    catch(error){
        res.status(401).json(error)
    }

}


//increment cart item quantity
exports.incrementcount=async(req,res)=>{
    //get product id from request params
    const {id}=req.params
    try{
        //check if the product in the cart
        const product = await carts.findOne({id})
        if(product){
            //increment product count and grand total
            product.quantity+=1
            product.grandtotal=product.price*product.quantity
            //save changes in mongodb
            await product.save()

            //increment,get all the products from the cart after updating in particular cart items
            const allcartitems=await carts.find()
            res.status(200).json(allcartitems)

        }
        else{
            res.status(404).json("Item not found")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
    
}

//decrement cart item quantity
exports.decrementcount=async(req,res)=>{
    //get product id from request params
    const {id}=req.params
    try{
        //check if the product in the cart
        const product = await carts.findOne({id})
        if(product){
            //decrement product count and grand total
            product.quantity-=1
            if(product.quantity==0){
                //remove product from the cart
                await carts.deleteOne({id})
                const allcartitems=await carts.find()
            res.status(200).json(allcartitems)
            }
            else{
                product.grandtotal=product.price*product.quantity
                //save changes in mongodb
                await product.save()
    
                //decrement,get all the products from the cart after updating in particular cart items
                const allcartitems=await carts.find()
                res.status(200).json(allcartitems)
            }
            

        }
        else{
            res.status(404).json("Item not found")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
    
}