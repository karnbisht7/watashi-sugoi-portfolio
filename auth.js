const Mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcryptjs')
const User = Mongoose.model("User")
const Cart = Mongoose.model("Cart")
const router = express.Router()


router.post( '/ecommerce' , (req , res)=>{
    const { name , cost , itemId , image} = req.body

    const cart = new Cart( {
        name:name ,
        cost:cost ,
        itemId:itemId ,
        image:image
    } )
    cart.save()
    .then(data=> {
        res.status(200).json({message:"cart saved successfully"})
    })
    .catch(err=>{
        console.log("error:",err)
    })
} )

router.post('/signup' , (req , res)=> {
    const {name , email , password } = req.body
    if( !name || !email || !password) {
        res,status(422).json({error:"enter all the fields"})
    }
    User.findOne({email : email})
        .then(savedUser=>{
            if(savedUser) {
                return res.status(422).json({error: "this nigga already in the party man ! you trynna scam us nigga???"})
            }
            bcrypt.hash(password , 12)
                .then(hashedPassword=>{
                    const user = new User ({
                        email : email ,
                        name : name ,
                        password : hashedPassword
                    })
                })
            
            user.save()
                .then(user=> {
                    console.log("okay nigga , we good !")
                })  
                .catch(err=> {
                    console.log(err)
                })                      
        })
        .catch(err=>{
            console.log(err)
        })
})


module.exports= router