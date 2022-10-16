const mongoose= require('mongoose');
const {Schema}=mongoose;

const categories=new Schema(
    {
       cat_id:{type:Number},
        name:{type:String}
        
        
        

        
    },
    { collection: 'categories' }
)

module.exports=mongoose.model('Category',categories,'categories')