
const router=require('express').Router();
const {verifyToken,verifyTokenAndAdmin}=require('./verifyToken')
const Product=require('../models/product')

 //create
router.post('/',verifyTokenAndAdmin, async(req,res)=>{
    const newProduct=new Product(req.body);
    try{
        const savedProduct=await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }
})

//update
router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
    
    try{
        const updatedProduct=await Cart.findByIdAndUpdate(req.param.id,{
            $set:req.body,
        },{new:true})
        res.status(200).json(updatedProduct);
    }
    catch(err){
        res.status(500).json(err);
    }  
}) 

//delete
router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
     try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('product has been deleted...')
     }catch(err){
        res.status(500).json(err);
     }
})

//get user proudct
router.get('/find/:userId',async(req,res)=>{
    try{
      const product= await Product.findById({userId:req.params.userId});
      
      
      res.status(200).json(product)
      
    }catch(err){
       res.status(500).json(err); 
    }
})  

//get all users
router.get('/',async(req,res)=>{
    const  qNew=req.query.new;
    const qCategory=req.query.category;
    try{
        let products;
        if(qNew){
            products=await Product.find().sort({createdAt:-1}).limit(5);
        }
        else if(qCategory){
            products=await Product.find({categories:{
                $in:[qCategory],
            }
        })
        }else products=await products.find()
      
      res.status(200).json(products);
    }catch(err){
       res.status(500).json(err); 
    }
})  



module.exports=router;