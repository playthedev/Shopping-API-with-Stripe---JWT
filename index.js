const express=require('express');
const app=express();
app.use(express.json())
const mongoose=require("mongoose");

const dotenv=require('dotenv');
dotenv.config();

const userRoute=require('./routes/user')
const authRoute=require('./routes/auth')
const orderRoute=require('./routes/order')
const cartRoute=require('./routes/cart')
const productRoute=require('./routes/product')

mongoose
.connect("mongodb+srv://arishkhan3312:Tbd6kZfxeILBbF8c@cluster0.cxziypf.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('db connected succesfully');
}).catch((err)=>{
  console.log(err);
})


app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/order',orderRoute)
app.use('/api/cart',cartRoute)
app.use('/api/auth',authRoute)


app.listen(5000,()=>{
    console.log('backend server is runnning');
}) 