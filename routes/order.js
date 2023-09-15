
const router=require('express').Router();
const {verifyToken,verifyTokenAndAdmin}=require('./verifyToken')
const Order=require('../models/order')

 //create
router.post('/', verifyTokenAndAdmin,async(req,res)=>{
    const newOrder=new Order(req.body);
    try{
        const savedOrder=await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }
})
 
//update
router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
    
    try{
        const updatedOrder=await Order.findByIdAndUpdate(req.param.id,{
            $set:req.body,
        },
        {new:true}
        );
        res.status(200).json(updatedOrder);
    }
    catch(err){
        res.status(500).json(err);
    }  
})

//delete 
router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
     try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('order has been deleted...')
     }catch(err){
        res.status(500).json(err);
     }
})

//get user orders
router.get('/find/:userId',verifyTokenAndAdmin,async(req,res)=>{
    try{
      const orders= await Order.find({userId:req.params.userId});
      
      
      res.status(200).json(orders)
      
    }catch(err){
       res.status(500).json(err); 
    }
})  

//get all orders
router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    
    try{
      const orders=await Order.find();
      res.status(200).json(orders);
    }catch(err){
       res.status(500).json(err); 
    }
})  

//get monthly income
router.get('/income',async(req,res)=>{
    const date=new Date();
    const lastMonth= new Date(date.setMonth(date.getMonth()-1));
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try{
       const income=await Order.aggregate([
        {$match:{createdAt:{$gte:previousMonth}}},
        {
            $project:{
                month:{$month:"$createdAt"},
                sales:"$amount",
            }
        },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:"$sales"}
                },
            
        },
       ]);
       res.status(200).json(income);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports=router;