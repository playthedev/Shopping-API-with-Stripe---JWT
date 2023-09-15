const { default: Stripe } = require('stripe');

const router=require('express').Router();
const strip=require('stripe')('sk_test_51KL3LUSFvchuUhWOebLJV8nI5uTDhDTmBO0qVZoRFHob5fXge5SiNyN7FvkU4R6tFuGnzc967Oe9whenVIHN9CdA00Uj6WzQiH');

router.post('/payment',(req,res)=>{
    Stripe.ChargesResource.create({
        source:req.body.tokenI,
        amount:req.body.amount,
        currency:'us',
    },(stripeErr,stripeRes)=>{
        if(stripeErr)res.status(500).json(stripErr);
        else res.status(200).json(stripeRes);
    })
})


module.exports=router;