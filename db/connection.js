//import mongoose
const mongoose=require('mongoose')

//to access the DATABASE variable in .env file
const db=process.env.DATABASE

mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log('Database is connected');
}).catch((err)=>{
    console.log(err);
})
