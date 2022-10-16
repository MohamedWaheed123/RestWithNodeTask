const mongoose= require('mongoose');
const {Schema}=mongoose;

const products=new Schema(
    {
      
        name:{type:String},
        price:{type:Number},
        quantity:{type:Number},
        image:{type:String},
        cat_id:{type:Number},
        
        
        

        
    },
    { collection: 'products' }
)

module.exports=mongoose.model('Product',products,'products')